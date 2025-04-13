import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import vitePluginXiyo from './src/lib/plugin/vitePluginXiyo.js';
import { paraglideVitePlugin } from '@inlang/paraglide-js';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		vitePluginXiyo(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'cookie', 'baseLocale']
		})
	],
	ssr: {
		noExternal: ['@inlang/paraglide-js']
	}
});
