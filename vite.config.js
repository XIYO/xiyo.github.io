import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import vitePluginXiyo from './src/lib/plugin/vitePluginXiyo.js';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit(), vitePluginXiyo()]
});
