import adapter from '@sveltejs/adapter-cloudflare';
import { execSync } from 'node:child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

const origin = `https://${readFileSync(join(process.cwd(), 'CNAME'), 'utf-8').trim()}`;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		experimental: {
			async: true
		}
	},
	kit: {
		adapter: adapter(),
		prerender: {
			origin
		},
		version: {
			name: execSync('git rev-parse HEAD').toString().trim()
		}
	}
};

export default config;
