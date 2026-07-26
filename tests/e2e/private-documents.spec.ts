import { expect, test } from '@playwright/test';
import { canAccessPrivateDocument } from '@/lib/privateDocumentPolicy';

const allowed = {
	nodeEnv: 'development',
	vercel: '',
	enabled: 'true',
	host: '127.0.0.1:3102',
	locale: 'ko',
	email: 'qa@example.invalid',
	phone: '000-0000-0000',
};

test('private-document policy allows only the complete local Korean gate', async ({
	browserName,
}) => {
	test.skip(browserName !== 'chromium');
	expect(canAccessPrivateDocument(allowed)).toBe(true);
	for (const override of [
		{ enabled: 'false' },
		{ email: '' },
		{ phone: '' },
		{ host: 'example.com' },
		{ locale: 'en' },
		{ nodeEnv: 'production' },
		{ vercel: '1' },
	]) {
		expect(
			canAccessPrivateDocument({ ...allowed, ...override }),
			JSON.stringify(override),
		).toBe(false);
	}
});

test('denied HTML, HEAD, and RSC responses do not leak private copy', async ({
	request,
	browserName,
}) => {
	test.skip(browserName !== 'chromium');
	const privateCopy = [
		'프론트엔드 엔지니어 이력서',
		'채용 담당자용 경력 브리프',
		'경력, 역량, 선별 프로젝트를 두 쪽 안에서 빠르게 확인하는 문서입니다.',
		'트리포스에서 맡은 업무 범위, 판단, 결과와 검증 기준을 두 쪽으로 정리한 문서입니다.',
	];
	for (const path of ['/ko/resume', '/ko/career-brief'] as const) {
		const html = await request.get(path);
		expect(html.status()).toBe(404);
		expect(html.headers()['x-robots-tag']).toBe('noindex, nofollow, noarchive');
		const body = await html.text();
		expect(body).toContain('Not Found');
		for (const copy of privateCopy) expect(body).not.toContain(copy);

		const head = await request.head(path);
		expect(head.status()).toBe(404);
		expect(head.headers()['x-robots-tag']).toBe('noindex, nofollow, noarchive');

		const rsc = await request.get(path, {
			headers: { RSC: '1', Accept: 'text/x-component' },
		});
		expect([200, 404]).toContain(rsc.status());
		expect(rsc.headers()['x-robots-tag']).toBe('noindex, nofollow, noarchive');
		const rscBody = await rsc.text();
		for (const copy of privateCopy) expect(rscBody).not.toContain(copy);

		const nonlocal = await request.get(path, {
			headers: { Host: 'portfolio.example.invalid' },
		});
		expect(nonlocal.status()).toBe(404);
	}
});
