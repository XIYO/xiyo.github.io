<script>
	import DlogItem from './DlogItem.svelte';

	const { dlogs, lang = 'ko' } = $props();
</script>

{#if dlogs && dlogs.length > 0}
	<section class="markdown">
		<h2>최근 작업</h2>
		<ul class="dlog-list">
			{#each dlogs as dlog (dlog.absolutePath)}
				<DlogItem {dlog} {lang} />
			{/each}
		</ul>
	</section>
{/if}
