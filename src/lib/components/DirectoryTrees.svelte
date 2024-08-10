<script>
	const { path } = $props();
</script>

<div>
	{#each path as p, i}
		<a href="/{path.slice(0, i + 1).join('/')}" style:--padding-line-start={i}>
			{i === path.length - 1 ? '📂' : '📁'}{p}
		</a>
	{/each}
</div>

<style>
    a {
        display: block;
				text-decoration: none;
				padding-inline-start: calc(var(--padding-line-start) * 1rem);

				&:not(:last-child) {
						margin-block-end: 0.5rem;
				}
    }
</style>
