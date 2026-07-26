import { expect, test } from '@playwright/test';

for (const viewport of [
	{ name: 'small-mobile', width: 320, height: 800 },
	{ name: 'mobile', width: 360, height: 800 },
] as const) {
	test(`${viewport.name} reflows without clipping or horizontal overflow`, async ({
		page,
	}) => {
		await page.setViewportSize(viewport);
		await page.goto('/ko');

		const measurements = await page.evaluate(() => {
			const heading = document.querySelector('h1')?.getBoundingClientRect();
			const menu = document
				.querySelector('button[aria-controls="mobile-manuscript-menu"]')
				?.getBoundingClientRect();

			return {
				fitsViewport: document.documentElement.scrollWidth <= window.innerWidth,
				headingVisible:
					Boolean(heading) &&
					heading!.left >= 0 &&
					heading!.right <= window.innerWidth &&
					heading!.height > 0,
				menuTarget: Boolean(menu) && menu!.width >= 44 && menu!.height >= 44,
			};
		});

		expect(measurements).toEqual({
			fitsViewport: true,
			headingVisible: true,
			menuTarget: true,
		});
	});
}

test('200% viewport equivalence preserves readable reflow', async ({
	page,
}) => {
	await page.setViewportSize({ width: 512, height: 384 });
	await page.goto('/ko/profile');

	await expect
		.poll(() =>
			page.evaluate(
				() => document.documentElement.scrollWidth <= window.innerWidth,
			),
		)
		.toBe(true);
	await expect(
		page.getByRole('heading', { level: 1, name: 'PROFILE' }),
	).toBeVisible();
});
