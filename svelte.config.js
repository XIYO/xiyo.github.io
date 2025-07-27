import adapter from '@sveltejs/adapter-cloudflare';

export default {
	kit: {
		adapter: adapter({
			// See below for an explanation of these options
			config: undefined,
			platformProxy: {
				configPath: undefined,
				environment: undefined,
				persist: undefined
			}
		}),
		prerender: {
			handleMissingId: 'warn'
		},
		trailingSlash: 'always'
	}
};
