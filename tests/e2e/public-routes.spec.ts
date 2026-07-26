import { expect, test } from '@playwright/test';

const routeContracts = [
	['/ko', '복잡한 경계를, 작동하는 화면으로.'],
	['/en', 'Complex boundaries, made operable.'],
	['/ko/work', 'WORK'],
	['/en/work', 'WORK'],
	['/ko/projects', 'PROJECTS'],
	['/en/projects', 'PROJECTS'],
	['/ko/profile', 'PROFILE'],
	['/en/profile', 'PROFILE'],
] as const;

test('server HTML carries the graphic branch marker and requested locale', async ({
	request,
}) => {
	for (const locale of ['ko', 'en'] as const) {
		const response = await request.get(`/${locale}?scene=static`);
		expect(response.status()).toBe(200);
		const html = await response.text();
		expect(html).toMatch(new RegExp(`<html[^>]+lang="${locale}"`));
		expect(html).toContain('data-design-branch="restrained-graphic-realism"');
	}
});
for (const [path, heading] of routeContracts) {
	test(`${path} exposes its contracted heading`, async ({ page }) => {
		await page.goto(`${path}?scene=static`);
		await expect(page.locator('h1')).toHaveText(heading);
	});
}

test('legacy routes redirect to their retained destinations', async ({
	page,
}) => {
	for (const [legacy, destination] of [
		['/ko/about', '/ko/profile'],
		['/en/about', '/en/profile'],
		['/about', '/(?:ko|en)/profile'],
		['/work', '/(?:ko|en)/work'],
		['/profile', '/(?:ko|en)/profile'],
	] as const) {
		await page.goto(legacy);
		await expect(page).toHaveURL(
			new RegExp(`${destination.replaceAll('/', '\\/')}/?$`),
		);
	}
});

test('locale switch retains the corresponding route', async ({ page }) => {
	await page.goto('/ko/projects?scene=static');
	await page.getByRole('link', { name: '영어로 보기' }).click();
	await expect(page).toHaveURL(/\/en\/projects/);
	await expect(page.locator('h1')).toHaveText('PROJECTS');
});

test('theme preference applies before and after reload', async ({ page }) => {
	await page.goto('/ko?scene=static');
	await page.getByRole('button', { name: '라이트 테마' }).click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	await expect(page.locator('html')).toHaveAttribute(
		'data-theme-preference',
		'light',
	);
	await page.reload();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	await page.getByRole('button', { name: '다크 테마' }).click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await page.getByRole('button', { name: '시스템 테마' }).click();
	await expect(page.locator('html')).toHaveAttribute(
		'data-theme-preference',
		'system',
	);
});

test('project detail uses an accessible native image dialog', async ({
	page,
}) => {
	await page.goto('/ko/projects/ai-agent-playbook');
	const trigger = page.locator('.graphic-gallery > button').first();
	await trigger.click();
	const dialog = page.getByRole('dialog', { name: '프로젝트 이미지' });
	await expect(dialog).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(dialog).not.toBeVisible();
	await expect(trigger).toBeFocused();
});

test('detail and document routes do not mount a scene renderer', async ({
	page,
}) => {
	for (const path of [
		'/ko/work/delivery-output-flow',
		'/ko/projects/ai-agent-playbook',
		'/ko/portfolio',
	] as const) {
		const response = await page.goto(path);
		expect(response?.status()).toBeLessThan(400);
		await expect(
			page.locator('[data-scene-route] canvas, .graphic-scene-canvas'),
		).toHaveCount(0);
	}
});

test('private employment documents remain unavailable without the local gate', async ({
	request,
}) => {
	for (const path of [
		'/ko/resume',
		'/en/resume',
		'/ko/career-brief',
		'/en/career-brief',
	] as const) {
		const response = await request.get(path);
		expect(response.status()).toBe(404);
		expect(response.headers()['x-robots-tag']).toBe(
			'noindex, nofollow, noarchive',
		);
		const html = await response.text();
		expect(html).not.toContain(
			'경력, 역량, 선별 프로젝트를 두 쪽 안에서 빠르게 확인하는 문서입니다.',
		);
		expect(html).not.toContain(
			'트리포스에서 맡은 업무 범위, 판단, 결과와 검증 기준을 두 쪽으로 정리한 문서입니다.',
		);
	}
});

test('invalid detail slugs return the not-found boundary', async ({ page }) => {
	for (const path of [
		'/ko/work/not-a-case',
		'/en/work/not-a-case',
		'/ko/projects/not-a-project',
		'/en/projects/not-a-project',
	]) {
		const response = await page.goto(path);
		expect(response?.status()).toBe(404);
	}
});
test('stored theme controls the pre-hydration selected styling', async ({
	page,
}) => {
	await page.addInitScript(() =>
		localStorage.setItem('jukrap.theme.graphic', 'light'),
	);
	await page.route(/\/_next\/static\/.*\.js(?:\?.*)?$/, (route) =>
		route.abort(),
	);
	await page.goto('/ko?scene=static', { waitUntil: 'domcontentloaded' });
	await expect(page.locator('html')).toHaveAttribute(
		'data-theme-preference',
		'light',
	);
	const light = page
		.locator('.graphic-desktop-theme [data-theme-option="light"]')
		.first();
	const system = page
		.locator('.graphic-desktop-theme [data-theme-option="system"]')
		.first();
	const [lightStyle, systemStyle] = await Promise.all([
		light.evaluate((element) => getComputedStyle(element).backgroundColor),
		system.evaluate((element) => getComputedStyle(element).backgroundColor),
	]);
	expect(lightStyle).not.toBe(systemStyle);
});

test('Archivo and IBM Plex load from bundled same-origin font files', async ({
	page,
}) => {
	await page.goto('/ko?scene=static');
	const evidence = await page.evaluate(async () => {
		await Promise.all([
			document.fonts.load("16px 'Archivo Variable'", 'OVERVIEW'),
			document.fonts.load("16px 'IBM Plex Mono'", 'OVERVIEW'),
		]);
		await document.fonts.ready;
		return {
			origin: location.origin,
			families: Array.from(document.fonts)
				.filter((face) => face.status === 'loaded')
				.map((face) => face.family.replace(/^['"]|['"]$/g, '')),
			fontResources: performance
				.getEntriesByType('resource')
				.map((entry) => entry.name)
				.filter((name) => name.includes('.woff2')),
		};
	});
	expect(evidence.families).toContain('Archivo Variable');
	expect(evidence.families).toContain('IBM Plex Mono');
	expect(evidence.fontResources.length).toBeGreaterThanOrEqual(2);
	for (const resource of evidence.fontResources) {
		expect(new URL(resource).origin).toBe(evidence.origin);
	}
	const packageResources = evidence.fontResources.filter((resource) =>
		resource.includes('/_next/static/media/'),
	);
	expect(packageResources.length).toBeGreaterThanOrEqual(2);
});
