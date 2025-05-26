<script>
	const { children, tag = 'div' } = $props();
</script>

<svelte:element this={tag}>
	{@render children()}
</svelte:element>
