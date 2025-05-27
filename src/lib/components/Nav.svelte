<script>
	import { page } from '$app/state';
	import { deLocalizeHref } from '$lib/paraglide/runtime.js';
	import { locales, localizeHref } from '$lib/paraglide/runtime.js';

	const { ...rest } = $props();

	const menu = {
		home: { href: '/' },
		posts: { href: '/posts' },
		about: { href: '/about' },
		globe: { href: '/globe' }
	};
</script>

<nav class="p-4 uppercase text-2xl font-black" {...rest}>
	<ul class="flex flex-col gap-4 items-center">
		{#each Object.entries(menu) as [key, { href }] (key)}
			<li
				class="aria-[current=page]:text-primary"
				aria-current={deLocalizeHref(page.url.pathname) === href ? 'page' : undefined}
			>
				<a {href}>{key}</a>
			</li>
		{/each}
	</ul>

	<hr class="my-4" />

	<ul class="flex flex-col gap-4 text-right">
		{#each locales as locale (locale)}
			<li>
				<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
			</li>
		{/each}
	</ul>
</nav>
