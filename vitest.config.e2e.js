import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		name: 'e2e',
		include: ['tests/*-e2e.test.js'],
		// Node 환경에서 Playwright 직접 사용
		environment: 'node',
		globals: true,
		setupFiles: [],
		pool: 'forks',
		testTimeout: 30000 // 30초 타임아웃
	}
});
