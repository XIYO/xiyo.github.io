import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		name: 'unit',
		include: ['tests/**/*.{js,ts}'],
		exclude: ['playwright-tests/**/*', 'e2e/**/*', 'tests/*-e2e.test.js'],
		browser: {
			enabled: true,
			provider: 'playwright',
			headless: true,
			instances: [
				{
					browser: 'chromium'
				}
			]
		},
		// 테스트 환경 설정
		setupFiles: ['./tests/setup.js']
	}
});
