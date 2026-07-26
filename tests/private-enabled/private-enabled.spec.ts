import { expect, test } from '@playwright/test';

const sentinelEmail = 'qa-private@example.invalid';
const sentinelPhone = '000-0000-0000';
const privateRoutes = ['/ko/resume', '/ko/career-brief'] as const;

for (const path of privateRoutes) {
	test(`${path} opens only on the complete enabled local gate`, async ({
		page,
		request,
	}) => {
		const response = await page.goto(path);
		expect(response?.status()).toBe(200);
		await expect(page.getByRole('link', { name: sentinelEmail })).toBeVisible();
		if (path.endsWith('/resume')) {
			await expect(page.getByRole('link', { name: sentinelPhone })).toBeVisible();
		} else {
			await expect(page.getByRole('link', { name: sentinelPhone })).toHaveCount(0);
		}
		await expect(page.locator('.private-document-page')).toHaveCount(2);
		expect(response?.headers()['x-robots-tag']).toBe(
			'noindex, nofollow, noarchive',
		);

		const nonlocal = await request.get(path, {
			headers: { Host: 'portfolio.example.invalid' },
		});
		expect(nonlocal.status()).toBe(404);
	});
}

test('enabled runtime still denies English private document routes', async ({
	request,
}) => {
	for (const path of ['/en/resume', '/en/career-brief'] as const) {
		const response = await request.get(path);
		expect(response.status()).toBe(404);
		expect(await response.text()).not.toContain(sentinelEmail);
	}
});

test('enabled private documents print as white high-contrast pages', async ({
	page,
}) => {
	for (const colorScheme of ['light', 'dark'] as const) {
		await page.emulateMedia({ media: 'print', colorScheme });
		await page.goto('/ko/resume');
		const colors = await page
			.locator('.private-document-page')
			.first()
			.evaluate((element) => {
				const style = getComputedStyle(element);
				return { background: style.backgroundColor, color: style.color };
			});
		expect(colors.background).toBe('rgb(255, 255, 255)');
		expect(colors.color).toBe('rgb(16, 19, 21)');
	}
});
