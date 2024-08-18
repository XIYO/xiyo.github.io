export const prerender = true;

export function load({ url}) {
	const title = url.pathname.split('/').at(-1) || 'XIYO Hole';

	return {
		title
	}
}
