import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

export const sha256 = (bytes) =>
	createHash('sha256').update(bytes).digest('hex');

export function rendererFingerprint(
	root,
	read = (rel) => fs.readFileSync(path.join(root, rel)),
	indexedPaths,
) {
	const paths = [
		'src/app/globals.css',
		'scripts/generate-document-pdfs.mjs',
		'package-lock.json',
	];
	function visit(rel) {
		for (const item of fs.readdirSync(path.join(root, rel), {
			withFileTypes: true,
		})) {
			const child = `${rel}/${item.name}`;
			if (item.isDirectory()) visit(child);
			else if (item.isFile()) paths.push(child);
		}
	}
	if (indexedPaths) {
		paths.push(
			...indexedPaths.filter((p) =>
				/^(?:src\/components\/documents|public\/fonts\/documents)\//.test(p),
			),
		);
	} else {
		visit('src/components/documents');
		visit('public/fonts/documents');
	}
	return sha256(
		JSON.stringify(
			paths.sort().map((p) => {
				const bytes = read(p);
				const normalized = /\.(?:css|tsx?|mjs|json|md|txt)$/.test(p)
					? Buffer.from(bytes.toString('utf8').replaceAll('\r\n', '\n'))
					: bytes;
				return [p, sha256(normalized)];
			}),
		),
	);
}

export function verifyDocumentRelease(
	root,
	read = (rel) => fs.readFileSync(path.join(root, rel)),
	checkRenderer = true,
	indexedPaths,
) {
	const content = JSON.parse(
		read('src/data/generated/career-public.json').toString('utf8'),
	);
	const release = JSON.parse(
		read('src/data/generated/document-pdf-manifest.json').toString('utf8'),
	);
	if (release.contentRevision !== content.revision)
		throw new Error('PDFs and website use different content versions');
	if (
		checkRenderer &&
		release.rendererFingerprint !== rendererFingerprint(root, read, indexedPaths)
	)
		throw new Error('PDF rendering inputs changed after review');
	const names = ['portfolio', 'resume', 'career-brief'].flatMap((name) =>
		['ko', 'en'].map((locale) => `${name}-${locale}.pdf`),
	);
	if (Object.keys(release.files).sort().join() !== names.sort().join())
		throw new Error('Expected exactly six public PDF records');
	for (const name of names)
		if (sha256(read(`public/documents/${name}`)) !== release.files[name].sha256)
			throw new Error(`Unreviewed public PDF: ${name}`);
	return { contentRevision: content.revision, pdfs: names.length };
}
