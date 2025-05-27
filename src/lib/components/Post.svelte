<script>
	import { datetime } from '$lib/paraglide/registry.js';
	import { getLocale } from '$lib/paraglide/runtime.js';
	import Card from '$lib/ui/card/Card.svelte';

	const { post } = $props();

	const firstCommitDate = new Date(post.data.dates.at(-1));
	const lastCommitDate = new Date(post.data.dates.at(0));

	/** @type {Intl.DateTimeFormatOptions} */
	const dateFormatOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };

	const firstCommitDateString = datetime(getLocale(), firstCommitDate, dateFormatOptions);
	const lastCommitDateString = datetime(getLocale(), lastCommitDate, dateFormatOptions);
</script>

<Card negative>
	<div id="post-content" class="p-4">
		{@html post.value}
	</div>

	<ul class="bg-primary p-2 text-right text-xs">
		<li>First commit : {firstCommitDateString}</li>
		{#if firstCommitDateString !== lastCommitDateString}
			<li>Last commit : {lastCommitDateString}</li>
		{/if}
	</ul>
</Card>
