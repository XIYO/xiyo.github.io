<script>
	import { page } from '$app/state';
	import { deLocalizeHref } from '$lib/paraglide/runtime.js';
	import { locales, localizeHref, setLocale } from '$lib/paraglide/runtime.js';

	const { ...rest } = $props();

	const menuPaths = {
		home: '/',
		posts: '/posts',
		about: '/about',
		globe: '/globe'
	};

	/**
	 * @param {Event} event
	 * @param {string} locale
	 */
	async function handleLocaleClick(event, locale) {
		event.preventDefault();
		setLocale(locale);
	}
</script>

<nav class="p-4 uppercase text-2xl font-black" {...rest}>
	<ul class="flex flex-col gap-4 items-center">
		{#each Object.entries(menuPaths) as [key, path] (key)}
			<li
				class="aria-[current=page]:text-primary"
				aria-current={deLocalizeHref(page.url.pathname) === path ? 'page' : undefined}
			>
				<a href={localizeHref(path)}>{key}</a>
			</li>
		{/each}
	</ul>

	<hr class="my-4" />

	<ul class="flex flex-col gap-4 text-right">
		{#each locales as locale (locale)}
			<li>
				<a
					href={localizeHref(page.url.pathname, { locale })}
					onclick={(e) => handleLocaleClick(e, locale)}
					class="hover:text-primary cursor-pointer"
				>
					{locale}
				</a>
			</li>
		{/each}
	</ul>
</nav>
