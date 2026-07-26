import { expect, test } from '@playwright/test';
import {
	canAccessPrivateDocument,
	type PrivateDocumentEnvironment,
} from '@/lib/privateDocumentPolicy';

const allowedEnvironment: PrivateDocumentEnvironment = {
	nodeEnv: 'development',
	enabled: 'true',
	email: 'qa@example.invalid',
	phone: '010-0000-0000',
};

test('private document policy allows only complete Korean loopback requests', () => {
	for (const host of ['localhost:3101', '127.0.0.1:3101', '[::1]:3101']) {
		expect(
			canAccessPrivateDocument({
				locale: 'ko',
				host,
				environment: allowedEnvironment,
			}),
		).toBe(true);
	}
});

for (const [name, locale, host, environment] of [
	[
		'disabled flag',
		'ko',
		'127.0.0.1:3101',
		{ ...allowedEnvironment, enabled: 'false' },
	],
	[
		'missing email',
		'ko',
		'127.0.0.1:3101',
		{ ...allowedEnvironment, email: undefined },
	],
	[
		'missing phone',
		'ko',
		'127.0.0.1:3101',
		{ ...allowedEnvironment, phone: undefined },
	],
	[
		'Vercel runtime',
		'ko',
		'127.0.0.1:3101',
		{ ...allowedEnvironment, vercel: '1' },
	],
	[
		'production runtime',
		'ko',
		'127.0.0.1:3101',
		{ ...allowedEnvironment, nodeEnv: 'production' },
	],
	['English locale', 'en', '127.0.0.1:3101', allowedEnvironment],
	['non-loopback host', 'ko', 'portfolio.example.test', allowedEnvironment],
	['host suffix attack', 'ko', 'localhost.example.test', allowedEnvironment],
] as const) {
	test(`private document policy denies ${name}`, () => {
		expect(
			canAccessPrivateDocument({
				locale,
				host,
				environment,
			}),
		).toBe(false);
	});
}

for (const route of ['/en/resume', '/en/career-brief'] as const) {
	test(`denied ${route} hides metadata, document copy, and contact values`, async ({
		request,
	}) => {
		const headerSets: Array<Record<string, string>> = [{}, { RSC: '1' }];
		for (const headers of headerSets) {
			const suffix = headers.RSC ? '?_rsc=privacy-qa' : '?mode=html';
			const response = await request.get(`${route}${suffix}`, { headers });
			const body = await response.text();

			if (headers.RSC) {
				expect(response.status()).toBe(200);
				expect(body).toContain('NEXT_HTTP_ERROR_FALLBACK;404');
			} else {
				expect(response.status()).toBe(404);
			}
			expect(response.headers()['x-robots-tag']).toContain('noindex');
			expect(body).not.toContain('qa@example.invalid');
			expect(body).not.toContain('010-0000-0000');
			expect(body).not.toContain('경력, 역량, 선별 프로젝트');
			expect(body).not.toContain('트리포스에서 맡은 업무 범위');
		}
	});
}

test('authorized local career brief remains available and noindex', async ({
	page,
}) => {
	const response = await page.goto('/ko/career-brief');

	expect(response?.status()).toBe(200);
	expect(response?.headers()['x-robots-tag']).toContain('noindex');
	await expect(page.getByText('qa@example.invalid')).toBeVisible();
});

for (const route of ['/ko/resume', '/ko/career-brief'] as const) {
	test(`authorized ${route} prints on white high-contrast pages`, async ({
		page,
	}) => {
		await page.addInitScript(() => {
			localStorage.setItem('jukrap.theme.manuscript', 'dark');
		});
		await page.goto(route);
		await page.emulateMedia({ media: 'print' });

		const colors = await page
			.locator('.document-page')
			.first()
			.evaluate((element) => {
				const style = getComputedStyle(element);
				return {
					background: style.backgroundColor,
					color: style.color,
				};
			});

		expect(colors).toEqual({
			background: 'rgb(255, 255, 255)',
			color: 'rgb(17, 17, 17)',
		});
	});
}
