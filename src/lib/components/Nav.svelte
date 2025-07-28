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

<nav class="p-4 uppercase text-2xl font-black tracking-widest" {...rest}>
	<ul class="grid">
		{#each Object.entries(menuPaths) as [key, path] (key)}
			{@const currentPath = deLocalizeHref(page.url.pathname)}
			{@const isCurrentPage = path === '/' ? currentPath === '/' : currentPath.startsWith(path)}
			<li
				class={[`text-center`, {'underline' : isCurrentPage}]}
				aria-current={isCurrentPage ? 'page' : undefined}
			>
				<a class="p-4 block" href={localizeHref(path)}>{key}</a>
			</li>
		{/each}
	</ul>

	<hr class="my-4" />

	<ul class="grid">
		{#each locales as locale (locale)}
			<li class="text-right">
				<a
					class="block p-2"
					href={localizeHref(page.url.pathname, { locale })}
					onclick={(e) => handleLocaleClick(e, locale)}
				>
					{locale}
				</a>
			</li>
		{/each}
	</ul>
</nav>
