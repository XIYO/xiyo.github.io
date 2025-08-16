export const prerender = true;

/** @type {import('./$types').LayoutLoad} */
export function load() {
	// Provide a shared meta container; page routes populate details.
	return { meta: {} };
}
