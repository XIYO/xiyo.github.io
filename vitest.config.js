import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['tests/**/*.{js,ts}'],
		exclude: ['e2e/**/*', 'tests/**/*.browser.js'],
		environment: 'node',
		testTimeout: 20000
	}
});
