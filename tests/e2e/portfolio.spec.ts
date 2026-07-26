import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const publicRoutes = [
	'/ko',
	'/en',
	'/ko/cases',
	'/en/archive',
	'/ko/profile',
] as const;

test.describe('public portfolio navigation', () => {
	test('@browser-smoke renders the exact first-screen copy', async ({
		page,
	}) => {
		await page.goto('/ko');

		await expect(
			page.getByRole('heading', {
				level: 1,
				name: '사용자가 만지는 구조를 설계하고, 끝까지 다듬습니다.',
			}),
		).toBeVisible();
		await expect(
			page.getByText('Web & Mobile Frontend Engineer').first(),
		).toBeVisible();
	});

	test('@browser-smoke keeps the corresponding detail route on locale change', async ({
		page,
	}) => {
		await page.goto('/ko/cases/delivery-output-flow');
		await page.getByRole('link', { name: '영어로 페이지 보기' }).click();

		await expect(page).toHaveURL(/\/en\/cases\/delivery-output-flow$/);
		await expect(page.locator('html')).toHaveAttribute('lang', 'en');
	});

	for (const [legacy, current] of [
		['/ko/work', '/ko/cases'],
		['/en/projects', '/en/archive'],
		['/ko/about', '/ko/profile'],
	] as const) {
		test(`redirects ${legacy} to ${current}`, async ({ page }) => {
			await page.goto(legacy);
			await expect(page).toHaveURL(new RegExp(`${current}$`));
		});
	}

	test('persists system, light, and dark preferences', async ({ page }) => {
		await page.goto('/ko');

		await page.getByRole('button', { name: '다크' }).click();
		await expect(page.locator('html')).toHaveClass(/dark/);
		await expect
			.poll(() =>
				page.evaluate(() => localStorage.getItem('jukrap.theme.manuscript')),
			)
			.toBe('dark');

		await page.reload();
		await expect(page.locator('html')).toHaveClass(/dark/);

		await page.getByRole('button', { name: '라이트' }).click();
		await expect(page.locator('html')).not.toHaveClass(/dark/);

		await page.getByRole('button', { name: '시스템' }).click();
		await expect
			.poll(() =>
				page.evaluate(() => localStorage.getItem('jukrap.theme.manuscript')),
			)
			.toBe('system');
	});

	test('opens and closes the accessible project image dialog', async ({
		page,
	}) => {
		await page.goto('/ko/archive/captain-donghae');
		const firstTrigger = page
			.getByRole('button', {
				name: /프로젝트 화면 1 크게 보기/,
			})
			.first();
		await firstTrigger.click();

		const dialog = page.getByRole('dialog', {
			name: '프로젝트 이미지 갤러리',
		});
		await expect(dialog).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(dialog).toBeHidden();
		await expect(firstTrigger).toBeFocused();
	});

	test('mobile menu exposes full navigation without horizontal overflow', async ({
		page,
	}) => {
		await page.setViewportSize({ width: 320, height: 800 });
		await page.goto('/ko');
		await page.getByRole('button', { name: '메뉴 열기' }).click();

		await expect(page.getByRole('link', { name: 'CASES' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'ARCHIVE' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'PROFILE' })).toBeVisible();
		await expect
			.poll(() =>
				page.evaluate(
					() => document.documentElement.scrollWidth <= window.innerWidth,
				),
			)
			.toBe(true);
	});
});

test.describe('accessibility', () => {
	for (const route of publicRoutes) {
		test(`${route} has no serious or critical axe violations`, async ({
			page,
		}) => {
			await page.goto(route);
			const results = await new AxeBuilder({ page })
				.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
				.analyze();
			const blocking = results.violations.filter(({ impact }) =>
				['serious', 'critical'].includes(impact ?? ''),
			);

			expect(blocking).toEqual([]);
		});
	}
});

test.describe('document access boundary', () => {
	test('keeps the public portfolio indexable and canonical', async ({
		page,
	}) => {
		const response = await page.goto('/ko/portfolio');
		expect(response?.status()).toBe(200);
		await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
			'content',
			/index, follow/,
		);
	});

	test('redirects the English portfolio to the Korean document', async ({
		page,
	}) => {
		await page.goto('/en/portfolio');
		await expect(page).toHaveURL(/\/ko\/portfolio$/);
	});

	test('serves private documents only to authorized Korean loopback requests', async ({
		page,
		request,
	}) => {
		const localResponse = await page.goto('/ko/resume');
		expect(localResponse?.status()).toBe(200);
		await expect(page.getByText('qa@example.invalid')).toBeVisible();
		expect(localResponse?.headers()['x-robots-tag']).toContain('noindex');

		const englishResponse = await request.get('/en/resume');
		expect(englishResponse.status()).toBe(404);

		const nonLoopbackResponse = await request.get('/ko/resume', {
			headers: { host: 'portfolio.example.test' },
		});
		expect(nonLoopbackResponse.status()).toBe(404);
	});
});
