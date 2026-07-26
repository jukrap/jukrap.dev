import { expect, test } from '@playwright/test';

test.describe('legacy and external links', () => {
	for (const [legacy, current] of [
		['/work', 'cases'],
		['/projects', 'archive'],
		['/about', 'profile'],
	] as const) {
		test(`redirects ${legacy} to the preferred-locale ${current} route`, async ({
			page,
		}) => {
			await page.goto(legacy);
			await expect(page).toHaveURL(new RegExp(`/(ko|en)/${current}$`));
		});
	}

	test('renders available project resources as safe external links', async ({
		page,
	}) => {
		await page.goto('/ko/archive/captain-donghae');
		const externalLink = page.locator('main a[target="_blank"]').first();

		await expect(externalLink).toBeVisible();
		await expect(externalLink).toHaveAttribute('href', /^https?:\/\//);
		await expect(externalLink).toHaveAttribute(
			'rel',
			/^(?=.*noopener)(?=.*noreferrer).+$/,
		);
	});
});

test('applies stored dark theme before hydration-visible content', async ({
	page,
}) => {
	await page.addInitScript(() => {
		localStorage.setItem('jukrap.theme.manuscript', 'dark');
	});
	await page.goto('/ko', { waitUntil: 'domcontentloaded' });

	await expect(page.locator('html')).toHaveClass(/dark/);
	await expect(page.locator('html')).toHaveAttribute(
		'data-theme-preference',
		'dark',
	);
	await expect
		.poll(() =>
			page.evaluate(() => getComputedStyle(document.body).backgroundColor),
		)
		.toBe('rgb(21, 22, 19)');
	await expect
		.poll(() =>
			page
				.getByRole('button', { name: '다크' })
				.evaluate((element) => getComputedStyle(element).textDecorationLine),
		)
		.toContain('underline');
});

for (const route of [
	'/ko',
	'/ko/cases/delivery-output-flow',
	'/ko/archive/captain-donghae',
	'/ko/profile',
] as const) {
	test(`primary mobile controls meet 44px targets on ${route}`, async ({
		page,
	}) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto(route);

		const undersized = await page.evaluate(() =>
			[...document.querySelectorAll<HTMLElement>('a, button')]
				.filter((element) => {
					const style = getComputedStyle(element);
					const rect = element.getBoundingClientRect();
					return (
						style.display !== 'none' &&
						style.visibility !== 'hidden' &&
						!element.closest('[hidden]') &&
						!element.classList.contains('sr-only') &&
						rect.width > 0 &&
						rect.height > 0
					);
				})
				.map((element) => {
					const rect = element.getBoundingClientRect();
					return {
						label:
							element.getAttribute('aria-label') ??
							element.textContent?.trim().slice(0, 50) ??
							element.tagName,
						width: Math.round(rect.width),
						height: Math.round(rect.height),
					};
				})
				.filter(({ width, height }) => width < 44 || height < 44),
		);

		expect(undersized).toEqual([]);
	});
}
