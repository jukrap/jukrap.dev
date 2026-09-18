import { spawn } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import postcss from 'postcss';

// Offline HTML-to-PDF conversion. This does not use a visitor's print dialog.
const origin = process.env.DOCUMENT_ORIGIN || 'http://127.0.0.1:3100';
const renderer = process.env.PDF_RENDERER;
if (!renderer) throw new Error('Set PDF_RENDERER to a Chromium executable.');
const output = path.resolve('public/documents');
const scratch = path.resolve('output/pdf/web-documents');
await mkdir(output, { recursive: true });
await mkdir(scratch, { recursive: true });
const assets = new Map();
const completedFiles = [];
const hash = (value) => createHash('sha256').update(value).digest('hex');
async function renderFile(htmlPath, profile, extraArgs) {
	return new Promise((resolve, reject) => {
		const child = spawn(
			renderer,
			[
				'--headless=new',
				'--disable-gpu',
				'--no-first-run',
				'--no-default-browser-check',
				'--disable-extensions',
				'--disable-background-networking',
				'--no-pdf-header-footer',
				'--window-size=1440,1000',
				'--force-device-scale-factor=1',
				'--virtual-time-budget=5000',
				`--user-data-dir=${profile}`,
				...extraArgs,
				pathToFileURL(htmlPath).href,
			],
			{ windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] },
		);
		let errors = '';
		const chunks = [];
		const timeout = setTimeout(() => {
			child.kill();
			reject(new Error('PDF renderer timed out.'));
		}, 60_000);
		child.stdout.on('data', (data) => chunks.push(data));
		child.stderr.on('data', (data) => {
			errors += data;
		});
		child.on('error', (error) => {
			clearTimeout(timeout);
			reject(error);
		});
		child.on('close', (code) => {
			clearTimeout(timeout);
			if (code === 0) resolve(Buffer.concat(chunks).toString('utf8'));
			else reject(new Error(errors));
		});
	});
}
async function inlineAsset(url) {
	const resolved = new URL(url.replaceAll('&amp;', '&'), origin);
	if (resolved.origin !== new URL(origin).origin)
		throw new Error(`Document asset must be local: ${resolved.pathname}`);
	if (!assets.has(resolved.href)) {
		assets.set(
			resolved.href,
			(async () => {
				const response = await fetch(resolved);
				if (!response.ok) throw new Error(`Asset failed: ${resolved.pathname}`);
				const bytes = Buffer.from(await response.arrayBuffer());
				return `data:${response.headers.get('content-type').split(';')[0]};base64,${bytes.toString('base64')}`;
			})(),
		);
	}
	return assets.get(resolved.href);
}

// The same screen layout is measured before printing, including its fonts,
// viewport-dependent spacing, and natural page heights. Freeze those values
// so changing from screen to paged media cannot reflow the document.
const preparePages = String.raw`
(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map(image => {
    if (image.complete) return image.naturalWidth ? Promise.resolve() : Promise.reject(new Error('Image failed'));
    return new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = () => reject(new Error('Image failed'));
    });
  }));
  const pages = [...document.querySelectorAll('.document-page')];
  if (!pages.length) throw new Error('No document pages found');
  const snapshots = pages.map(page => ({
    page,
    rect: page.getBoundingClientRect(),
    elements: [page, ...page.querySelectorAll('*')].map(element => {
      const computed = getComputedStyle(element);
      return { element, css: [...computed].map(key => key + ':' + computed.getPropertyValue(key) + ';').join('') };
    }),
  }));
  let sheet = '@page{margin:0} html,body{margin:0!important;padding:0!important;background:white!important;}';
  for (const [index, snapshot] of snapshots.entries()) {
    for (const {element, css} of snapshot.elements) element.style.cssText = css;
    const width = Math.ceil(snapshot.rect.width);
    const height = Math.ceil(snapshot.rect.height) + 1;
    const pageName = 'webpage' + index;
    snapshot.page.style.margin = '0';
    snapshot.page.style.boxShadow = 'none';
    snapshot.page.style.page = pageName;
    snapshot.page.style.breakAfter = index === snapshots.length - 1 ? 'auto' : 'page';
    snapshot.page.style.breakInside = 'avoid';
    sheet += '@page ' + pageName + '{size:' + width + 'px ' + height + 'px;margin:0;}';
  }
  for (const element of document.querySelectorAll('.document-shell,.document-stage,.document-pages,.private-document')) {
    element.style.cssText = 'display:block;width:auto;min-height:0;margin:0;padding:0;background:white;';
  }
  const style = document.createElement('style'); style.textContent = sheet; document.head.append(style);
  document.documentElement.dataset.pdfReady = 'true';
})().catch(error => { document.body.textContent = 'PDF_GENERATION_FAILED: ' + error.message; });
`;

const manifest = {
	format: 'web-layout-v1',
	viewport: { width: 1440, height: 1000 },
	files: {},
};
for (const locale of ['ko', 'en']) {
	for (const slug of ['portfolio', 'resume', 'career-brief']) {
		const response = await fetch(`${origin}/${locale}/${slug}`);
		if (!response.ok) throw new Error(`Document failed: ${locale}/${slug}`);
		const original = await response.text();
		let html = original.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
		if (/(?:href="tel:|010[-. ]?\d{4}[-. ]?\d{4})/.test(html))
			throw new Error(
				'Private contact details must not be included in public PDFs.',
			);
		html = html.replace(/<html([^>]*)class="[^"]*"/i, '<html$1class=""');
		html = html.replace(
			/<header\b[^>]*class="document-toolbar"[\s\S]*?<\/header>/,
			'',
		);
		const cssUrls = [
			...new Set(
				[
					...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g),
				].map((match) => match[1]),
			),
		];
		if (!cssUrls.length) throw new Error('No document stylesheets found.');
		const styles = [];
		for (const cssUrl of cssUrls) {
			const css = await (await fetch(new URL(cssUrl, origin))).text();
			const root = postcss.parse(css);
			root.walkAtRules((rule) => {
				if (
					rule.name === 'page' ||
					(rule.name === 'media' && /\bprint\b/.test(rule.params))
				)
					rule.remove();
			});
			let screenCss = root.toString();
			for (const match of [
				...screenCss.matchAll(/url\(["']?(\/[^)"']+)["']?\)/g),
			]) {
				screenCss = screenCss.replace(
					match[0],
					`url("${await inlineAsset(match[1])}")`,
				);
			}
			styles.push(screenCss);
		}
		html = html.replace(/<link\b[^>]*>/g, '');
		html = html.replace(/<img\b[^>]*>/g, (tag) =>
			tag.replace(/\s(?:srcset|sizes|loading)="[^"]*"/gi, ''),
		);
		for (const match of [...html.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/g)]) {
			html = html.replace(
				match[0],
				match[0].replace(match[1], await inlineAsset(match[1])),
			);
		}
		// Retain public links rather than binding PDF annotations to localhost.
		html = html.replace(
			/href="\/(ko|en)\//g,
			'href="https://jukrap.vercel.app/$1/',
		);
		html = html.replace('</head>', `<style>${styles.join('\n')}</style></head>`);
		html = html.replace('</body>', `<script>${preparePages}</script></body>`);
		const name = `${slug}-${locale}`;
		const htmlPath = path.join(scratch, `${name}.html`);
		const pdfPath = path.join(output, `${name}.pdf`);
		const candidatePath = path.join(scratch, `${name}-${randomUUID()}.pdf`);
		await writeFile(htmlPath, html);
		const profile = path.join(scratch, `renderer-${name}`);
		const prepared = await renderFile(htmlPath, profile, ['--dump-dom']);
		if (!/<html[^>]*data-pdf-ready="true"/.test(prepared))
			throw new Error(`Document layout did not finish preparing: ${name}`);
		const readyPath = path.join(scratch, `${name}-ready.html`);
		await writeFile(
			readyPath,
			prepared.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ''),
		);
		await renderFile(readyPath, profile, [`--print-to-pdf=${candidatePath}`]);
		const bytes = await readFile(candidatePath);
		if (
			bytes.subarray(0, 5).toString() !== '%PDF-' ||
			!bytes.subarray(-100).toString().includes('%%EOF')
		)
			throw new Error(`Invalid PDF: ${name}`);
		completedFiles.push({ candidatePath, pdfPath });
		manifest.files[`${name}.pdf`] = {
			sha256: hash(bytes),
			htmlSha256: hash(html),
			bytes: bytes.length,
		};
		console.log(`${name}.pdf: ${bytes.length} bytes`);
	}
}
// Keep the last complete release available if any document conversion fails.
for (const { candidatePath, pdfPath } of completedFiles)
	await rename(candidatePath, pdfPath);
await writeFile(
	path.join(scratch, 'manifest.json'),
	JSON.stringify(manifest, null, 2),
);
