import { defineConfig, devices } from '@playwright/test';

const port = process.env.GRAPHIC_QA_PORT ?? '3102';
const baseURL = `http://127.0.0.1:${port}`;
const nodeExecutable = JSON.stringify(process.execPath);

export default defineConfig({
	testDir: './tests',
	fullyParallel: false,
	forbidOnly: true,
	retries: 1,
	workers: 1,
	timeout: 45_000,
	expect: { timeout: 10_000 },
	outputDir: 'output/playwright-results',
	reporter: [
		['list'],
		['html', { outputFolder: 'output/playwright-report', open: 'never' }],
	],
	use: {
		baseURL,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
	},
	webServer: {
		env: {
			PRIVATE_DOCUMENTS_ENABLED: 'false',
			PRIVATE_RESUME_EMAIL: '',
			PRIVATE_RESUME_PHONE: '',
		},
		command: `${nodeExecutable} node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port ${port}`,
		url: `${baseURL}/ko`,
		reuseExistingServer: false,
		timeout: 120_000,
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
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
