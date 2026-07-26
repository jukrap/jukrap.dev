import { expect, test } from '@playwright/test';

test('representative routes have no console or failed-request errors', async ({
	page,
}) => {
	const consoleErrors: string[] = [];
	let currentRoute = 'before-navigation';
	const requestFailures: string[] = [];

	page.on('console', (message) => {
		if (message.type() === 'error')
			consoleErrors.push(`[${currentRoute}] ${message.text()}`);
	});
	page.on('requestfailed', (request) => {
		const failure = request.failure()?.errorText ?? 'unknown error';
		requestFailures.push(`${request.method()} ${request.url()} — ${failure}`);
	});

	for (const route of [
		'/ko',
		'/en/cases/delivery-output-flow',
		'/ko/archive/captain-donghae',
		'/ko/profile',
	]) {
		await page.goto(route);
		currentRoute = route;
		await expect(page.locator('h1')).toBeVisible();
	}

	expect(consoleErrors).toEqual([]);
	expect(requestFailures).toEqual([]);
});

for (const preference of ['light', 'dark'] as const) {
	test(`public portfolio prints white and high-contrast from ${preference}`, async ({
		page,
	}) => {
		await page.addInitScript((theme) => {
			localStorage.setItem('jukrap.theme.manuscript', theme);
		}, preference);
		await page.goto('/ko/portfolio');
		await page.emulateMedia({ media: 'print' });

		const colors = await page.evaluate(() => {
			const root = getComputedStyle(document.documentElement);
			const pageElement = document.querySelector('.document-page');
			const documentPage = pageElement ? getComputedStyle(pageElement) : null;

			return {
				rootBackground: root.backgroundColor,
				rootColor: root.color,
				pageBackground: documentPage?.backgroundColor,
				pageColor: documentPage?.color,
			};
		});

		expect(colors).toEqual({
			rootBackground: 'rgb(255, 255, 255)',
			rootColor: 'rgb(17, 17, 17)',
			pageBackground: 'rgb(255, 255, 255)',
			pageColor: 'rgb(17, 17, 17)',
		});
	});
}

test('loads the self-hosted editorial fonts without external font requests', async ({
	page,
}) => {
	const externalFontRequests: string[] = [];
	const baseOrigin = new URL(
		process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3101',
	).origin;
	page.on('request', (request) => {
		if (request.resourceType() !== 'font') return;
		const url = new URL(request.url());
		if (url.origin !== baseOrigin) {
			externalFontRequests.push(request.url());
		}
	});

	await page.goto('/ko');
	const fontState = await page.evaluate(async () => {
		await Promise.all([
			document.fonts.load(
				'700 48px "Noto Serif KR Variable"',
				'사용자가 만지는 구조',
			),
			document.fonts.load('500 12px "JetBrains Mono Variable"', 'INDEX'),
		]);
		await document.fonts.ready;

		const loadedFamilies = Array.from(document.fonts)
			.filter((face) => face.status === 'loaded')
			.map((face) => face.family.replaceAll('"', ''));

		return {
			serif: document.fonts.check(
				'700 48px "Noto Serif KR Variable"',
				'사용자가 만지는 구조',
			),
			mono: document.fonts.check('500 12px "JetBrains Mono Variable"', 'INDEX'),
			loadedFamilies,
		};
	});

	expect(fontState.serif).toBe(true);
	expect(fontState.mono).toBe(true);
	expect(fontState.loadedFamilies).toContain('Noto Serif KR Variable');
	expect(fontState.loadedFamilies).toContain('JetBrains Mono Variable');
	expect(externalFontRequests).toEqual([]);
});
