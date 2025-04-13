<script>
	import { page } from '$app/state';
	import { deLocalizeHref } from '$lib/paraglide/runtime.js';
</script>

<ul>
	<li aria-current={deLocalizeHref(page.url.pathname) === '/' ? 'page' : undefined}>
		<a href="/">home</a>
	</li>
	<li aria-current={deLocalizeHref(page.url.pathname).startsWith('/posts') ? 'page' : undefined}>
		<a href="/posts">posts</a>
	</li>
	<li aria-current={deLocalizeHref(page.url.pathname) === '/about' ? 'page' : undefined}>
		<a href="/about">about</a>
	</li>
	<li aria-current={deLocalizeHref(page.url.pathname) === '/globe' ? 'page' : undefined}>
		<a href="/globe">globe</a>
	</li>
</ul>

<style>
	ul {
		/* reset */
		padding-inline-start: unset;
		list-style-type: none;

		display: grid;
		gap: var(--default-margin);
	}

	li[aria-current='page'] {
		color: var(--color-primary);
	}
</style>
