import { expect, test, type Page } from '@playwright/test';

const waitForStablePage = async (page: Page) => {
	await page.evaluate(() => document.fonts.ready);
	await expect(page.locator('body')).toBeVisible();
};

for (const viewport of [
	{ name: 'desktop', width: 1440, height: 1024 },
	{ name: 'tablet', width: 1024, height: 768 },
	{ name: 'mobile', width: 390, height: 844 },
] as const) {
	test(`@visual Korean INDEX ${viewport.name}`, async ({ page }) => {
		await page.setViewportSize(viewport);
		await page.goto('/ko');
		await waitForStablePage(page);

		await expect(page).toHaveScreenshot(`index-ko-${viewport.name}.png`, {
			fullPage: true,
		});
	});
}

test('@visual English INDEX dark', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 1024 });
	await page.addInitScript(() => {
		localStorage.setItem('jukrap.theme.manuscript', 'dark');
	});
	await page.goto('/en');
	await waitForStablePage(page);

	await expect(page).toHaveScreenshot('index-en-desktop-dark.png', {
		fullPage: true,
	});
});

test('@visual Korean case detail', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 1024 });
	await page.goto('/ko/cases/delivery-output-flow');
	await waitForStablePage(page);

	await expect(page).toHaveScreenshot('case-ko-desktop.png', {
		fullPage: true,
	});
});

test('@visual Korean project detail mobile', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/ko/archive/captain-donghae');
	await waitForStablePage(page);

	await expect(page).toHaveScreenshot('archive-detail-ko-mobile.png', {
		fullPage: true,
	});
});
