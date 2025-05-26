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