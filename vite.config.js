import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		tailwindcss(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'cookie', 'baseLocale']
		}),
		{
			name: 'markdown-charset',
			configureServer(server) {
				return () => {
					server.middlewares.use((req, res, next) => {
						if (req.url?.endsWith('.md')) {
							const _setHeader = res.setHeader.bind(res);
							res.setHeader = function (name, value) {
								if (name.toLowerCase() === 'content-type' && value === 'text/markdown') {
									return _setHeader('Content-Type', 'text/markdown; charset=utf-8');
								}
								return _setHeader(name, value);
							};
						}
						next();
					});
				};
			}
		}
	],
	ssr: {
		noExternal: ['@inlang/paraglide-js']
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					// node_modules에서 가져온 라이브러리들을 vendor 청크로 분리
					if (id.includes('node_modules')) {
						if (id.includes('mermaid')) return 'mermaid';
						if (id.includes('paraglide')) return 'i18n';
						return 'vendor';
					}
				}
			}
		}
	}
});
