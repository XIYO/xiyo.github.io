import adapter from '@sveltejs/adapter-cloudflare';

export default {
	kit: {
		adapter: adapter({
			// Deploy as a Cloudflare Worker
			// routes are handled by the worker; static in /static is served by the worker
		}),
		prerender: {
			handleMissingId: 'warn',
			handleHttpError: 'warn',
			entries: ['*']
		}
	}
};
