import test from 'node:test';
import assert from 'node:assert/strict';
import { rendererFingerprint } from './document-release.mjs';
import {
	isPrivatePath,
	isAllowedRepositoryPath,
	assertPublicValue,
	publicPdfs,
} from './check-public-boundary.mjs';

test('private material is rejected even when nested below source or public', () => {
	for (const name of [
		'.claude/settings.local.json',
		'docs/plans/x.md',
		'AGENTS.md',
		'src/dev-notes/x.ts',
		'public/career-private/resume.pdf',
		'output/check.json',
	])
		assert.equal(isPrivatePath(name), true, name);
	for (const name of [
		'src/data/generated/career-public.json',
		'package-lock.json',
		'public/images/avatar.png',
		'README.md',
	])
		assert.equal(isPrivatePath(name), false, name);
});
test('public data rejects local locators, hidden fields and credentials', () => {
	for (const data of [
		{ sourcePath: 'evidence' },
		{ value: 'D:/private/source' },
		{ value: 'http://192.168.1.10/private' },
		{ token: 'anything' },
	])
		assert.throws(() => assertPublicValue(data));
	assert.doesNotThrow(() =>
		assertPublicValue({
			title: '공개 프로젝트',
			url: 'https://github.com/jukrap/jukrap.dev',
		}),
	);
});
test('only the six approved public PDFs are named', () => {
	assert.equal(publicPdfs.length, 6);
	assert.equal(new Set(publicPdfs).size, 6);
	assert.ok(!publicPdfs.some((name) => /private|submission/.test(name)));
});

test('unclassified root material and extra public documents are rejected', () => {
	for (const name of [
		'sources/company.txt',
		'public/notes.md',
		'public/documents/company-resume.pdf',
		'career-source.json',
	])
		assert.equal(isAllowedRepositoryPath(name), false);
	for (const name of [
		'src/data/generated/career-public.json',
		'public/documents/resume-ko.pdf',
		'public/fonts/documents/OFL-1.1.txt',
		'README.md',
	])
		assert.equal(isAllowedRepositoryPath(name), true);
});

test('staged rendering inputs use the index even if worktree files differ', () => {
	const files = new Map([
		['src/app/globals.css', Buffer.from('body {}\n')],
		['scripts/generate-document-pdfs.mjs', Buffer.from('// render\n')],
		['package-lock.json', Buffer.from('{}\n')],
		['src/components/documents/Document.tsx', Buffer.from('export {};\n')],
	]);
	const read = (name) => {
		assert.ok(files.has(name), `Missing staged input: ${name}`);
		return files.get(name);
	};
	const indexed = [...files.keys()];
	const before = rendererFingerprint('unused-worktree', read, indexed);
	files.set('src/components/documents/Extra.tsx', Buffer.from('export {};'));
	assert.equal(rendererFingerprint('unused-worktree', read, indexed), before);
	assert.notEqual(
		rendererFingerprint('unused-worktree', read, [...files.keys()]),
		before,
	);
	assert.notEqual(
		rendererFingerprint(
			'unused-worktree',
			read,
			indexed.filter((p) => !p.endsWith('Document.tsx')),
		),
		before,
	);
	files.set(
		'src/components/documents/Document.tsx',
		Buffer.from('export {};\r\n'),
	);
	assert.equal(rendererFingerprint('unused-worktree', read, indexed), before);
});
