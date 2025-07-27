<script>
	import * as m from '$lib/paraglide/messages.js';
	import {localizeHref} from '$lib/paraglide/runtime.js';

	/**
	 * @typedef {import('../types/components.js').PostsProps} PostsProps
	 */

	/** @type {PostsProps} */
	const { category } = $props();
</script>

<main>
	<section>
	<h2>categories</h2>

	{#if category.childCategories.length}
		<ul class="uppercase space-y-2">
			{#each category.childCategories as childCategory (childCategory.absolutePath)}
				<li>
					<a href={localizeHref(childCategory.absolutePath)}>
						{childCategory.name}
						<!-- ({childCategory.allPosts.length}) -->
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		{m.subCategoryEmpty()}
	{/if}

	<h2>posts</h2>

	<ul class="space-y-2">
		{#each category.allPosts as post (post.absolutePath)}
			<li>
				<a href={localizeHref(post.absolutePath)}>{post.data.title}</a>
			</li>
		{/each}
	</ul>
	</section>
</main>
