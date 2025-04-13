<script>
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime.js';
</script>

<ul>
	{#each locales as locale (locale)}
		<li>
			<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		/* reset */
		padding-inline-start: unset;
		list-style-type: none;

		display: grid;
		gap: var(--default-margin);
		text-align: end;
	}
</style>
