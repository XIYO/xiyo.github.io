<script>
	import Border from '$lib/Border.svelte';

	const { category } = $props();
</script>

<Border viewTransitionName="content" negative>
	{#if category.childCategories.length}
		<h2 class="padding highlight-background">sub category</h2>
		<ul>
			{#each category.childCategories as childCategory}
				<li>
					<a href={childCategory.absolutePath}>{childCategory.name} ({childCategory.posts.length})</a>
				</li>
			{/each}
		</ul>
	{/if}

	<h2 class="padding highlight-background">sub posts</h2>
	<ul>
		{#each category.posts as post}
			<li>
				<article>
					<a href={post.absolutePath}>{post.title}</a>
				</article>
			</li>
		{/each}
	</ul>
</Border>

<style>
		h2 {
				margin-block: 0;
		}

    ul {
        /* reset */
        list-style: none;

        li {
						&:not(:last-child) {
								margin-block-end: 0.5rem;
						}
        }
    }
</style>
