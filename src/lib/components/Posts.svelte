<script>
	import Card from '$lib/ui/card/Card.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime.js';

	const { category } = $props();
</script>

<Card negative>
	<h2 class="bg-primary p-4 font-black text-xl uppercase">categories</h2>

	<div class="p-4">
		{#if category.childCategories.length}
			<ul class="flex uppercase flex-col gap-2">
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
	</div>
</Card>

<Card negative>
	<h2 class="bg-primary p-4 font-black text-xl uppercase">posts</h2>

	<ul class="p-4 flex flex-col gap-2">
		{#each category.allPosts as post (post.absolutePath)}
			<li>
				<a href={localizeHref(post.absolutePath)}>{post.data.title}</a>
			</li>
		{/each}
	</ul>
</Card>
