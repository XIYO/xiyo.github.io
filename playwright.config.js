// ESM 환경용 Playwright 설정 파일
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	webServer: {
		command: 'pnpm run preview',
		port: 4173,
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI
	},
	testDir: './e2e',
	use: {
		baseURL: 'http://localhost:4173',
		headless: true
	}
};

export default config;
