import { expect, test } from '@playwright/test';

test('raw English HTML carries the correct lang and exact H1', async ({
	request,
	page,
}) => {
	const response = await request.get('/en');
	const html = await response.text();

	expect(response.status()).toBe(200);
	expect(html).toMatch(/<html[^>]*lang="en"/);
	expect(html).toContain(
		'I build the structures people use—and keep revising until they hold.',
	);

	await page.goto('/en');
	await expect(
		page.getByRole('heading', {
			level: 1,
			name: 'I build the structures people use—and keep revising until they hold.',
		}),
	).toBeVisible();
});

for (const route of [
	'/fr',
	'/ko/cases/not-a-real-case',
	'/en/archive/not-a-real-project',
] as const) {
	test(`returns 404 for invalid route ${route}`, async ({ request }) => {
		const response = await request.get(route);
		expect(response.status()).toBe(404);
	});
}

test('archive detail locale switch preserves its slug', async ({ page }) => {
	await page.goto('/ko/archive/captain-donghae');
	await page.getByRole('link', { name: '영어로 페이지 보기' }).click();

	await expect(page).toHaveURL(/\/en\/archive\/captain-donghae$/);
	await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('browser back and forward keep list/detail history', async ({ page }) => {
	await page.goto('/ko');
	await page.getByRole('link', { name: 'CASES', exact: true }).click();
	await expect(page).toHaveURL(/\/ko\/cases$/);
	await page.locator('main a[href^="/ko/cases/"]').first().click();
	await expect(page).toHaveURL(/\/ko\/cases\/.+$/);
	const detailURL = page.url();

	await page.goBack();
	await expect(page).toHaveURL(/\/ko\/cases$/);
	await page.goForward();
	await expect(page).toHaveURL(detailURL);
});

test('skip link focuses the main content destination', async ({ page }) => {
	await page.goto('/ko');
	await page.keyboard.press('Tab');
	const skipLink = page.getByRole('link', { name: '본문으로 건너뛰기' });
	await expect(skipLink).toBeFocused();
	await skipLink.press('Enter');

	await expect(page.locator('#main-content')).toBeFocused();
});

test('mobile menu Escape restores focus to its trigger', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/ko');
	const trigger = page.getByRole('button', { name: '메뉴 열기' });
	await trigger.click();
	await expect(page.locator('#mobile-manuscript-menu a').first()).toBeFocused();

	await page.keyboard.press('Escape');
	await expect(page.getByRole('button', { name: '메뉴 열기' })).toBeFocused();
	await expect(page.locator('#mobile-manuscript-menu')).toBeHidden();
});

test('gallery arrow keys change the uniquely named image and retain dialog focus', async ({
	page,
}) => {
	await page.goto('/ko/archive/captain-donghae');
	await page.getByRole('button', { name: /프로젝트 화면 1 크게 보기/ }).click();
	const dialog = page.getByRole('dialog', {
		name: '프로젝트 이미지 갤러리',
	});
	await expect(dialog.getByAltText(/프로젝트 화면 1$/)).toBeVisible();

	await page.keyboard.press('ArrowRight');
	await expect(dialog.getByAltText(/프로젝트 화면 2$/)).toBeVisible();
	for (let index = 0; index < 8; index += 1) {
		await page.keyboard.press('Tab');
		expect(
			await dialog.evaluate((element) => element.contains(document.activeElement)),
		).toBe(true);
	}
});

test('reduced-motion preference collapses interaction durations', async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/ko');

	const durations = await page
		.getByRole('button', { name: '다크' })
		.evaluate((element) => {
			const style = getComputedStyle(element);
			return {
				animation: style.animationDuration,
				transition: style.transitionDuration,
			};
		});

	expect(Number.parseFloat(durations.animation)).toBeLessThanOrEqual(0.00001);
	expect(Number.parseFloat(durations.transition)).toBeLessThanOrEqual(0.00001);
});
