import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3101';

export default defineConfig({
	testDir: './tests/e2e',
	fullyParallel: false,
	timeout: 60_000,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	workers: 1,
	reporter: [['list'], ['html', { open: 'never' }]],
	outputDir: 'test-results',
	expect: {
		toHaveScreenshot: {
			animations: 'disabled',
			caret: 'hide',
			maxDiffPixelRatio: 0.01,
		},
	},
	use: {
		baseURL,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
	},
	webServer: process.env.PLAYWRIGHT_BASE_URL
		? undefined
		: {
				command: 'npm run dev -- --port 3101',
				url: baseURL,
				reuseExistingServer: false,
				timeout: 120_000,
				env: {
					PRIVATE_DOCUMENTS_ENABLED: 'true',
					PRIVATE_RESUME_EMAIL: 'qa@example.invalid',
					PRIVATE_RESUME_PHONE: '010-0000-0000',
				},
			},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],
});
