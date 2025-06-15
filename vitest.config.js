import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		name: 'unit',
		include: ['tests/**/*.{js,ts}'],
		exclude: ['playwright-tests/**/*', 'e2e/**/*']
	}
});
