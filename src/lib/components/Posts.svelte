<script>
	import Card from '$lib/ui/card/Card.svelte';
	import CardHeader from '$lib/ui/card/CardHeader.svelte';
	import * as m from '$lib/paraglide/messages.js';

	const { category } = $props();
</script>

<Card class="margin-block" id="category" negative viewTransitionName="category">
	<CardHeader>categories</CardHeader>

	{#if category.childCategories.length}
		<ul class="padding">
			{#each category.childCategories as childCategory (childCategory.absolutePath)}
				<li>
					<a href={childCategory.absolutePath}>
						{childCategory.name} ({childCategory.allPosts.length})
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="padding margin-block-reset">{m.subCategoryEmpty()}</p>
	{/if}
</Card>

<Card class="margin-block" id="article" negative viewTransitionName="posts">
	<CardHeader>posts</CardHeader>

	<ul class="padding">
		{#each category.allPosts as post (post.absolutePath)}
			<li>
				<article>
					<a href={post.absolutePath}>{post.data.title}</a>
				</article>
			</li>
		{/each}
	</ul>
</Card>

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
