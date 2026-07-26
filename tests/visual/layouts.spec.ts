import { expect, test } from '@playwright/test';
import sharp from 'sharp';

const viewports = [
	{ name: 'desktop', width: 1440, height: 1024 },
	{ name: 'tablet', width: 1024, height: 768 },
	{ name: 'mobile', width: 390, height: 844 },
	{ name: 'narrow', width: 360, height: 800 },
	{ name: 'minimum', width: 320, height: 800 },
] as const;

for (const viewport of viewports) {
	test(`${viewport.name} overview matches the fixed snapshot without overflow`, async ({
		page,
		browserName,
	}) => {
		test.skip(browserName !== 'chromium');
		await page.setViewportSize(viewport);
		await page.goto('/ko?scene=static');
		await expect(page.locator('h1')).toBeVisible();
		const metrics = await page.evaluate(() => ({
			clientWidth: document.documentElement.clientWidth,
			scrollWidth: document.documentElement.scrollWidth,
			heading: document.querySelector('h1')?.getBoundingClientRect().toJSON(),
		}));
		expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
		expect(metrics.heading?.left ?? -1).toBeGreaterThanOrEqual(0);
		expect(metrics.heading?.right ?? viewport.width + 1).toBeLessThanOrEqual(
			viewport.width,
		);
		await expect(page).toHaveScreenshot(`${viewport.name}-overview.png`, {
			fullPage: true,
			animations: 'disabled',
		});
	});
}

for (const theme of ['light', 'dark'] as const) {
	for (const locale of ['ko', 'en'] as const) {
		test(`${locale} ${theme} work and projects match fixed mobile snapshots`, async ({
			page,
			browserName,
		}) => {
			test.skip(browserName !== 'chromium');
			await page.setViewportSize({ width: 390, height: 844 });
			await page.goto(`/${locale}/work?scene=static`);
			await page
				.getByRole('button', {
					name: locale === 'ko' ? '메뉴 열기' : 'Open menu',
				})
				.click();
			const themeName =
				locale === 'ko'
					? theme === 'light'
						? '라이트 테마'
						: '다크 테마'
					: theme === 'light'
						? 'Light theme'
						: 'Dark theme';
			await page.getByRole('button', { name: themeName }).click();
			for (const route of ['work', 'projects'] as const) {
				await page.goto(`/${locale}/${route}?scene=static`);
				await expect(page.locator('h1')).toBeVisible();
				const overflow = await page.evaluate(
					() =>
						document.documentElement.scrollWidth -
						document.documentElement.clientWidth,
				);
				expect(overflow).toBeLessThanOrEqual(1);
				await expect(page).toHaveScreenshot(
					`${locale}-${theme}-${route}-mobile.png`,
					{
						fullPage: true,
						animations: 'disabled',
					},
				);
			}
		});
	}
}

for (const route of ['overview', 'work', 'projects'] as const) {
	test(`${route} live reduced-motion scene matches its QA-camera snapshot`, async ({
		page,
		browserName,
	}) => {
		test.skip(browserName !== 'chromium');
		await page.setViewportSize({ width: 1440, height: 1024 });
		await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
		const path = route === 'overview' ? '/ko' : `/ko/${route}`;
		await page.goto(`${path}?sceneCamera=qa`);
		await expect(page.locator('[data-scene-route]')).toHaveAttribute(
			'data-scene-state',
			'ready',
			{
				timeout: 20_000,
			},
		);
		await expect(page.locator('.graphic-scene-fallback')).toHaveCSS(
			'opacity',
			'0',
		);
		if (route === 'projects') {
			const renderedCanvas = await page.locator('canvas').screenshot();
			const screenCrop = await sharp(renderedCanvas)
				.extract({ left: 400, top: 100, width: 160, height: 130 })
				.png()
				.toBuffer();
			const screenStats = await sharp(screenCrop).stats();
			expect(
				Math.max(...screenStats.channels.slice(0, 3).map(({ stdev }) => stdev)),
				'Project artifact screen must contain the uploaded media texture.',
			).toBeGreaterThan(20);
		}
		await page.evaluate(
			() =>
				new Promise<void>((resolve) =>
					requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
				),
		);
		await expect(page.locator('.graphic-scene-canvas')).toHaveScreenshot(
			`${route}-live-qa-desktop.png`,
			{ animations: 'allow' },
		);
	});
}

test('mobile controls provide 44px targets, keyboard focus, and a closed-menu tab boundary', async ({
	page,
	browserName,
}) => {
	test.skip(browserName !== 'chromium');
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/ko?scene=static');
	await expect(page.locator('.graphic-mobile-menu')).toBeHidden();
	await expect(page.locator('.graphic-mobile-menu a').first()).not.toBeFocused();
	await page.getByRole('button', { name: '메뉴 열기' }).click();
	const targets = page.locator(
		'.graphic-menu-button, .graphic-locale-control, .graphic-mobile-menu a, .graphic-mobile-menu button',
	);
	for (let index = 0; index < (await targets.count()); index += 1) {
		const box = await targets.nth(index).boundingBox();
		if (!box) continue;
		expect(box.width).toBeGreaterThanOrEqual(44);
		expect(box.height).toBeGreaterThanOrEqual(44);
	}
	await page.keyboard.press('Tab');
	const focusStyle = await page.locator(':focus-visible').evaluate((element) => {
		const style = getComputedStyle(element);
		return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
	});
	expect(focusStyle.outlineStyle).not.toBe('none');
	expect(Number.parseFloat(focusStyle.outlineWidth)).toBeGreaterThan(0);
});

test('200 percent page scale preserves readable content and 320px reflow', async ({
	page,
	browserName,
}) => {
	test.skip(browserName !== 'chromium');
	await page.setViewportSize({ width: 640, height: 800 });
	await page.goto('/en/profile');
	const session = await page.context().newCDPSession(page);
	await session.send('Emulation.setPageScaleFactor', { pageScaleFactor: 2 });
	await expect(page.locator('h1')).toBeVisible();
	await page.setViewportSize({ width: 320, height: 800 });
	const overflow = await page.evaluate(
		() =>
			document.documentElement.scrollWidth - document.documentElement.clientWidth,
	);
	expect(overflow).toBeLessThanOrEqual(1);
});

test('public recruiting document prints white with dark ink from both themes', async ({
	page,
	browserName,
}) => {
	test.skip(browserName !== 'chromium');
	for (const colorScheme of ['light', 'dark'] as const) {
		await page.emulateMedia({ media: 'print', colorScheme });
		await page.goto('/ko/portfolio');
		const colors = await page
			.locator('.document-page')
			.first()
			.evaluate((element) => {
				const style = getComputedStyle(element);
				return { background: style.backgroundColor, color: style.color };
			});
		expect(colors.background).toBe('rgb(255, 255, 255)');
		expect(colors.color).toBe('rgb(16, 19, 21)');
	}
});
