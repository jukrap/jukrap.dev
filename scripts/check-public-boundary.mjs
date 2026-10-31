import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { verifyDocumentRelease } from './document-release.mjs';

export const publicPdfs = ['portfolio', 'resume', 'career-brief'].flatMap(
	(name) =>
		['ko', 'en'].map((locale) => `public/documents/${name}-${locale}.pdf`),
);

export function isPrivatePath(name) {
	const normalized = name.replaceAll('\\', '/');
	return (
		/(^|\/)(?:\.career|career-private|_reference|dev-notes|\.ai-agent-playbook|\.ai-playbook|ai-playbook|\.agents|\.claude|output|tmp)(\/|$)/i.test(
			normalized,
		) ||
		/^(?:AGENTS\.md|PLANS\.md|PROJECT_SPEC\.md|docs\/|scripts\/document-pdfs\.md)$/i.test(
			normalized,
		) ||
		normalized.startsWith('docs/')
	);
}

export function isAllowedRepositoryPath(name) {
	if (isPrivatePath(name)) return false;
	if (/^(src|scripts|tests?|\.github)\//.test(name)) return true;
	if (name.startsWith('public/')) {
		if (name.endsWith('.pdf')) return publicPdfs.includes(name);
		return (
			/\.(?:avif|gif|ico|jpe?g|png|svg|webp|mp4|webm|woff2?|ttf|otf|glb|gltf|bin)$/i.test(
				name,
			) ||
			/(?:^|\/)LICENSE(?:\.txt|\.md)?$/i.test(name) ||
			/^public\/fonts\/.+\/(?:README\.md|OFL-1\.1\.txt)$/.test(name) ||
			[
				'public/robots.txt',
				'public/sitemap.xml',
				'public/manifest.webmanifest',
			].includes(name)
		);
	}
	return [
		'.env.example',
		'.gitignore',
		'.nvmrc',
		'.prettierignore',
		'.prettierrc',
		'README.md',
		'components.json',
		'next.config.mjs',
		'package-lock.json',
		'package.json',
		'postcss.config.mjs',
		'tailwind.config.ts',
		'tsconfig.json',
	].includes(name);
}

export function assertPublicValue(value, locator = 'public') {
	if (typeof value === 'string') {
		if (
			/(?:(?:^|[\s("'=])[A-Za-z]:[\\/]|file:\/\/|\/Users\/|\/home\/)/.test(value)
		)
			throw new Error(`Private path in ${locator}`);
		if (
			/https?:\/\/(?:localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+)(?=[:/]|$)/i.test(
				value,
			)
		)
			throw new Error(`Private URL in ${locator}`);
		if (
			/(?:sk-proj-[\w-]{12,}|gh[pousr]_[\w]{20,}|-----BEGIN .*PRIVATE KEY)/.test(
				value,
			)
		)
			throw new Error(`Credential in ${locator}`);
	} else if (Array.isArray(value))
		value.forEach((v, i) => assertPublicValue(v, `${locator}[${i}]`));
	else if (value && typeof value === 'object')
		for (const [key, item] of Object.entries(value)) {
			if (
				/^(internalName|realName|sourcePath|privateNotes|rawEvidence|submissionHistory|password|token|credential)$/i.test(
					key,
				)
			)
				throw new Error(`Private field in ${locator}.${key}`);
			assertPublicValue(item, `${locator}.${key}`);
		}
}

export function verifyBoundary(root, stagedOnly = false) {
	const git = (...args) =>
		execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
	// The index is the whole next commit, including unchanged tracked files.
	const tracked = git('ls-files', '-z').split('\0').filter(Boolean);
	const privatePaths = tracked.filter((name) => !isAllowedRepositoryPath(name));
	if (privatePaths.length)
		throw new Error(
			`Private files are tracked or staged: ${privatePaths.join(', ')}`,
		);
	const unexpectedPdfs = tracked.filter(
		(p) => p.toLowerCase().endsWith('.pdf') && !publicPdfs.includes(p),
	);
	if (unexpectedPdfs.length)
		throw new Error(`Unapproved PDF files: ${unexpectedPdfs.join(', ')}`);
	const read = (rel) =>
		stagedOnly
			? execFileSync('git', ['show', `:${rel}`], { cwd: root })
			: fs.readFileSync(path.join(root, rel));
	const manifest = JSON.parse(
		read('src/data/generated/career-public.json').toString('utf8'),
	);
	if (manifest.schemaVersion !== 1 || !/^[a-f0-9]{16}$/.test(manifest.revision))
		throw new Error('Invalid content manifest');
	for (const [name, expectedHash] of Object.entries(manifest.modules)) {
		if (!/^[A-Za-z0-9-]+\.json$/.test(name))
			throw new Error('Unsafe module filename');
		const bytes = read(`src/data/generated/career/${name}`);
		if (createHash('sha256').update(bytes).digest('hex') !== expectedHash)
			throw new Error(`Content hash mismatch: ${name}`);
		const data = JSON.parse(bytes.toString('utf8'));
		if (data.schemaVersion !== 1 || data.revision !== manifest.revision)
			throw new Error(`Mixed content revision: ${name}`);
		assertPublicValue(data, name);
	}
	if (stagedOnly || process.argv.includes('--release'))
		verifyDocumentRelease(root, read, true, stagedOnly ? tracked : undefined);
	return {
		trackedFilesChecked: tracked.length,
		contentRevision: manifest.revision,
		modules: Object.keys(manifest.modules).length,
	};
}

if (
	process.argv[1] &&
	path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
	try {
		console.log(
			JSON.stringify(
				verifyBoundary(process.cwd(), process.argv.includes('--staged')),
			),
		);
	} catch (error) {
		console.error(error.message);
		process.exitCode = 1;
	}
}
