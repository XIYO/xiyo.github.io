<script>
	import { datetime } from '$lib/paraglide/registry.js';
	import { getLocale } from '$lib/paraglide/runtime.js';
	import Card from '$lib/ui/card/Card.svelte';

	const { postMetadata, postContent } = $props();

	// dates가 있을 때만 날짜 표시
	const hasDates = postMetadata?.data?.dates && postMetadata.data.dates.length > 0;
	const firstCommitDate = hasDates ? new Date(postMetadata.data.dates.at(-1)) : null;
	const lastCommitDate = hasDates ? new Date(postMetadata.data.dates.at(0)) : null;

	/** @type {Intl.DateTimeFormatOptions} */
	const dateFormatOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };

	const firstCommitDateString = firstCommitDate ? datetime(getLocale(), firstCommitDate, dateFormatOptions) : '';
	const lastCommitDateString = lastCommitDate ? datetime(getLocale(), lastCommitDate, dateFormatOptions) : '';
</script>

<Card negative>
	<div id="post-content" class="p-4">
		{@html postContent?.value}
	</div>

	{#if hasDates}
		<ul class="bg-primary p-2 text-right text-xs">
			<li>First commit : {firstCommitDateString}</li>
			{#if firstCommitDateString !== lastCommitDateString}
				<li>Last commit : {lastCommitDateString}</li>
			{/if}
		</ul>
	{/if}
</Card>
