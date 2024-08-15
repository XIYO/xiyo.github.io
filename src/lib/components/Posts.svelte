<script>
	import Border from '$lib/ui/Border.svelte';
	import BorderSubTitle from '$lib/ui/BorderSubTitle.svelte';

	const { category } = $props();
</script>

{#if category.childCategories.length}
	<Border viewTransitionName="category" negative>
		<BorderSubTitle title="categories" />

		<ul class="padding">
			{#each category.childCategories as childCategory}
				<li>
					<a href={childCategory.absolutePath}
						>{childCategory.name} ({childCategory.allPosts.length})</a
					>
				</li>
			{/each}
		</ul>
	</Border>
{/if}

<Border viewTransitionName="article" negative>
	<BorderSubTitle title="posts" />

	<ul class="padding">
		{#each category.allPosts as post}
			<li>
				<article>
					<a href={post.absolutePath}>{post.data.title}</a>
				</article>
			</li>
		{/each}
	</ul>
</Border>

<style>
	ul {
		/* reset */
		list-style: none;
		margin-block: unset;

		li:not(:last-child) {
			margin-block-end: 0.5rem;
		}
	}
</style>
