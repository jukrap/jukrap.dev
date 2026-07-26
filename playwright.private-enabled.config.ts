import { defineConfig, devices } from '@playwright/test';

const port = process.env.GRAPHIC_PRIVATE_QA_PORT ?? '3103';
const baseURL = `http://127.0.0.1:${port}`;
const nodeExecutable = JSON.stringify(process.execPath);

export default defineConfig({
	testDir: './tests/private-enabled',
	fullyParallel: false,
	forbidOnly: true,
	retries: 0,
	workers: 1,
	timeout: 45_000,
	expect: { timeout: 10_000 },
	outputDir: 'output/private-enabled-results',
	reporter: [['list']],
	use: {
		baseURL,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
	},
	webServer: {
		env: {
			PRIVATE_DOCUMENTS_ENABLED: 'true',
			PRIVATE_RESUME_EMAIL: 'qa-private@example.invalid',
			PRIVATE_RESUME_PHONE: '000-0000-0000',
			VERCEL: '',
			PRIVATE_QA_DIST_DIR: '.next-private-qa',
		},
		command: `${nodeExecutable} node_modules/next/dist/bin/next dev --webpack --hostname 127.0.0.1 --port ${port}`,
		url: `${baseURL}/ko`,
		reuseExistingServer: false,
		timeout: 120_000,
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
