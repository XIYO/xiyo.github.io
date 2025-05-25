import * as m from '$lib/paraglide/messages.js';

export function load({ data }) {
	return {
		title: m.title(),
		description: m.description(),
		...data
	};
}
