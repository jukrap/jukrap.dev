import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import sharp from 'sharp';

const sceneRoutes = ['/ko', '/ko/work', '/ko/projects'] as const;

test.describe('Chromium scene renderer contracts', () => {
	test.skip(
		({ browserName }) => browserName !== 'chromium',
		'WebGL pixel, CDP, and lifecycle assertions use the fixed Chromium renderer.',
	);

	for (const path of sceneRoutes) {
		test(`live WebGL first frame is nonblank on ${path}`, async ({
			page,
			browserName,
		}) => {
			test.skip(
				browserName !== 'chromium',
				'Pixel sampling uses the fixed Chromium renderer.',
			);
			await page.goto(`${path}?sceneCamera=qa`);
			const scene = page.locator('[data-scene-route]');
			await expect(scene).toHaveAttribute('data-scene-state', 'ready', {
				timeout: 20_000,
			});
			const canvas = scene.locator('canvas');
			await expect(canvas).toBeVisible();
			const png = await canvas.screenshot();
			const { data, info } = await sharp(png)
				.removeAlpha()
				.raw()
				.toBuffer({ resolveWithObject: true });
			const first = [data[0], data[1], data[2]];
			let changed = 0;
			for (let index = 0; index < data.length; index += info.channels) {
				if (
					Math.abs(data[index] - first[0]) +
						Math.abs(data[index + 1] - first[1]) +
						Math.abs(data[index + 2] - first[2]) >
					24
				) {
					changed += 1;
				}
			}
			expect(changed).toBeGreaterThan(info.width * info.height * 0.01);
		});
	}

	test('project scene waits for its approved texture before ready', async ({
		page,
		browserName,
	}) => {
		test.skip(browserName !== 'chromium');
		const mediaResponse = page.waitForResponse((response) =>
			response
				.url()
				.includes('/images/graphic-scene-media/ai-agent-playbook-desktop.avif'),
		);
		await page.goto('/ko/projects?sceneCamera=qa');
		expect((await mediaResponse).status()).toBe(200);
		await expect(page.locator('[data-scene-route="projects"]')).toHaveAttribute(
			'data-scene-state',
			'ready',
			{ timeout: 20_000 },
		);
	});

	test('static, unsupported, and render-error paths expose the localized fallback', async ({
		page,
		browserName,
	}) => {
		test.skip(browserName !== 'chromium');
		for (const query of ['scene=static', 'scene=fail', 'scene=throw']) {
			await page.goto(`/en/work?${query}`);
			const scene = page.locator('[data-scene-route="work"]');
			await expect(scene).toHaveAttribute('data-scene-state', 'fallback');
			await expect(
				scene.getByRole('img', {
					name: 'A plane structure representing the selected system boundary',
				}),
			).toBeVisible();
			await expect(scene.locator('canvas')).toHaveCount(0);
		}
	});

	test('reduced motion renders a stable contracted pose', async ({
		page,
		browserName,
	}) => {
		test.skip(browserName !== 'chromium');
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/ko?sceneCamera=qa');
		const scene = page.locator('[data-scene-route="overview"]');
		await expect(scene).toHaveAttribute('data-scene-state', 'ready', {
			timeout: 20_000,
		});
		const before = await scene.locator('canvas').screenshot();
		await page.waitForTimeout(250);
		const after = await scene.locator('canvas').screenshot();
		expect(Buffer.compare(before, after)).toBe(0);
	});

	test('viewport resize selects the contracted camera tier and DPR caps', async ({
		page,
		browserName,
	}) => {
		test.skip(browserName !== 'chromium');
		const session = await page.context().newCDPSession(page);
		for (const viewport of [
			{
				width: 1440,
				height: 1024,
				tier: 'desktop',
				quality: 'high',
				cap: 1.75,
				mobile: false,
			},
			{
				width: 1024,
				height: 768,
				tier: 'tablet',
				quality: 'medium',
				cap: 1.5,
				mobile: false,
			},
			{
				width: 390,
				height: 844,
				tier: 'mobile',
				quality: 'medium',
				cap: 1.25,
				mobile: true,
			},
		] as const) {
			await session.send('Emulation.setDeviceMetricsOverride', {
				width: viewport.width,
				height: viewport.height,
				deviceScaleFactor: 3,
				mobile: viewport.mobile,
			});
			if (page.url() === 'about:blank') await page.goto('/ko');
			else await page.evaluate(() => window.dispatchEvent(new Event('resize')));
			const canvasRoot = page.locator('[data-scene-camera-tier]');
			await expect(canvasRoot).toHaveAttribute(
				'data-scene-camera-tier',
				viewport.tier,
			);
			await expect
				.poll(async () => Number(await canvasRoot.getAttribute('data-scene-dpr')))
				.toBe(viewport.cap);
		}
		await session.send('Emulation.clearDeviceMetricsOverride');
	});

	test('offscreen and hidden scenes pause, then route navigation removes the renderer', async ({
		page,
		browserName,
	}) => {
		test.skip(browserName !== 'chromium');
		await page.goto('/ko?sceneCamera=qa');
		const scene = page.locator('[data-scene-route="overview"]');
		await expect(scene).toHaveAttribute('data-scene-state', 'ready', {
			timeout: 20_000,
		});
		await page.evaluate(() => {
			Object.defineProperty(document, 'hidden', {
				configurable: true,
				value: true,
			});
			document.dispatchEvent(new Event('visibilitychange'));
		});
		await expect(scene).toHaveAttribute('data-scene-active', 'false');
		await page.evaluate(() => {
			Object.defineProperty(document, 'hidden', {
				configurable: true,
				value: false,
			});
			document.dispatchEvent(new Event('visibilitychange'));
			window.scrollTo(0, document.body.scrollHeight);
		});
		await expect(scene).toHaveAttribute('data-scene-active', 'false');
		await page.goto('/ko/work/delivery-output-flow');
		await expect(page.locator('[data-scene-route] canvas')).toHaveCount(0);
	});

	test('one WebGL context loss shows fallback before a contracted remount', async ({
		page,
		browserName,
	}) => {
		test.skip(browserName !== 'chromium');
		await page.goto('/ko?sceneCamera=qa');
		const scene = page.locator('[data-scene-route="overview"]');
		await expect(scene).toHaveAttribute('data-scene-state', 'ready', {
			timeout: 20_000,
		});
		const supported = await page.locator('canvas').evaluate((canvas) => {
			const webglCanvas = canvas as HTMLCanvasElement;
			const context =
				webglCanvas.getContext('webgl2') ?? webglCanvas.getContext('webgl');
			const extension = context?.getExtension('WEBGL_lose_context');
			if (!extension) return false;
			(
				window as typeof window & { restoreGraphicContext?: () => void }
			).restoreGraphicContext = () => extension.restoreContext();
			extension.loseContext();
			return true;
		});
		test.skip(!supported, 'Renderer does not expose WEBGL_lose_context.');
		await expect(scene).toHaveAttribute('data-scene-state', 'fallback');
		await page.evaluate(() =>
			(
				window as typeof window & { restoreGraphicContext?: () => void }
			).restoreGraphicContext?.(),
		);
		await expect(scene).toHaveAttribute('data-scene-state', 'ready', {
			timeout: 20_000,
		});
	});

	test('twenty renderer mounts stop loops, dispose resources, and keep bounded heap', async ({
		page,
		browserName,
	}) => {
		test.skip(browserName !== 'chromium');
		test.setTimeout(180_000);
		const session = await page.context().newCDPSession(page);
		await session.send('Performance.enable');
		await page.goto('/ko?sceneCamera=qa&sceneProbe=1');
		await expect(page.locator('[data-scene-route="overview"]')).toHaveAttribute(
			'data-scene-state',
			'ready',
			{ timeout: 20_000 },
		);
		const readLifecycle = () =>
			page.evaluate(
				() =>
					(
						window as typeof window & {
							__GRAPHIC_SCENE_LIFECYCLE__?: {
								active: number;
								mounts: number;
								disposals: number;
								resourceDisposals: number;
								frames: number;
							};
						}
					).__GRAPHIC_SCENE_LIFECYCLE__ ?? {
						active: 0,
						mounts: 0,
						disposals: 0,
						resourceDisposals: 0,
						frames: 0,
					},
			);
		await expect.poll(async () => (await readLifecycle()).active).toBe(1);
		await page.locator('.graphic-fold-case').click();
		await expect(page).toHaveURL(/delivery-output-flow/);
		await expect.poll(async () => (await readLifecycle()).active).toBe(0);
		await expect(page.locator('.graphic-scene-canvas:visible')).toHaveCount(0);
		const framesAfterDisposal = (await readLifecycle()).frames;
		await page.waitForTimeout(250);
		expect((await readLifecycle()).frames).toBe(framesAfterDisposal);

		await page.goBack();
		await expect(page.locator('[data-scene-route="overview"]')).toHaveAttribute(
			'data-scene-state',
			'ready',
			{ timeout: 20_000 },
		);
		await expect.poll(async () => (await readLifecycle()).active).toBe(1);
		await expect(
			page.locator('[data-scene-route="overview"] canvas'),
		).toBeVisible();
		await page.locator('.graphic-fold-case').click();
		await expect(page).toHaveURL(/delivery-output-flow/);
		await expect.poll(async () => (await readLifecycle()).active).toBe(0);

		await session.send('HeapProfiler.collectGarbage');
		const readHeap = async () => {
			const result = await session.send('Performance.getMetrics');
			return (
				result.metrics.find(({ name }) => name === 'JSHeapUsedSize')?.value ?? 0
			);
		};
		const before = await readHeap();
		for (let index = 0; index < 20; index += 1) {
			await page.goBack();
			await expect(page).toHaveURL(/sceneProbe=1/);
			await expect(page.locator('[data-scene-route="overview"]')).toHaveAttribute(
				'data-scene-state',
				'ready',
				{ timeout: 20_000 },
			);
			await expect.poll(async () => (await readLifecycle()).active).toBe(1);
			await page.locator('.graphic-fold-case').click();
			await expect(page).toHaveURL(/delivery-output-flow/);
			await expect.poll(async () => (await readLifecycle()).active).toBe(0);
		}
		const lifecycle = await readLifecycle();
		expect(lifecycle.disposals).toBeGreaterThanOrEqual(21);
		expect(lifecycle.resourceDisposals).toBeGreaterThanOrEqual(21);
		await session.send('HeapProfiler.collectGarbage');
		const after = await readHeap();
		expect(after - before).toBeLessThan(24 * 1024 * 1024);
	});
	test('project scene variants stay inside the texture budget', async () => {
		const directory = path.join(
			process.cwd(),
			'public',
			'images',
			'graphic-scene-media',
		);
		const files = (await readdir(directory)).filter((file) =>
			file.endsWith('.avif'),
		);
		expect(files).toHaveLength(18);
		for (const file of files) {
			const source = path.join(directory, file);
			const [{ size }, metadata] = await Promise.all([
				stat(source),
				sharp(source).metadata(),
			]);
			expect(size, file).toBeLessThanOrEqual(800 * 1024);
			const cap = file.includes('-mobile.') ? 1024 : 1600;
			expect(metadata.width ?? cap + 1, file).toBeLessThanOrEqual(cap);
			expect(metadata.height ?? cap + 1, file).toBeLessThanOrEqual(cap);
		}
	});

	test('a two-gigabyte device receives the static fallback', async ({
		page,
		browserName,
	}) => {
		test.skip(browserName !== 'chromium');
		await page.addInitScript(() => {
			Object.defineProperty(navigator, 'deviceMemory', {
				configurable: true,
				value: 2,
			});
		});
		await page.goto('/ko/projects');
		const scene = page.locator('[data-scene-route="projects"]');
		await expect(scene).toHaveAttribute('data-scene-state', 'fallback');
		await expect(scene.locator('canvas')).toHaveCount(0);
	});

	test('modified clicks keep the active scene mounted in the current tab', async ({
		page,
		browserName,
	}) => {
		test.skip(browserName !== 'chromium');
		await page.goto('/ko?sceneCamera=qa');
		const scene = page.locator('[data-scene-route="overview"]');
		await expect(scene).toHaveAttribute('data-scene-state', 'ready', {
			timeout: 20_000,
		});
		await page.locator('.graphic-fold-case').evaluate((link) => {
			link.dispatchEvent(
				new MouseEvent('click', {
					bubbles: true,
					cancelable: true,
					button: 0,
					ctrlKey: true,
				}),
			);
		});
		await expect(page).toHaveURL(/sceneCamera=qa/);
		await expect(scene).toHaveAttribute('data-scene-state', 'ready');
		await expect(scene.locator('canvas')).toBeVisible();
	});
	test('mobile QA camera requests only the mobile project texture', async ({
		page,
		browserName,
	}) => {
		test.skip(browserName !== 'chromium');
		await page.setViewportSize({ width: 390, height: 844 });
		const requests: string[] = [];
		page.on('request', (request) => {
			if (request.url().includes('/images/graphic-scene-media/')) {
				requests.push(request.url());
			}
		});
		await page.goto('/ko/projects?sceneCamera=qa');
		const scene = page.locator('[data-scene-route="projects"]');
		await expect(scene).toHaveAttribute('data-scene-state', 'ready', {
			timeout: 20_000,
		});
		await expect(scene.locator('[data-scene-media-tier="mobile"]')).toBeVisible();
		expect(requests.some((url) => url.includes('-mobile.avif'))).toBe(true);
		expect(requests.some((url) => url.includes('-desktop.avif'))).toBe(false);
	});
});
