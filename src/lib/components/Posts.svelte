<script>
	import Header from '$lib/Header.svelte';
	import Border from '$lib/Border.svelte';

	const { category } = $props();
</script>

<Header>
	<h1>{category.name}</h1>
</Header>

<Border viewTransitionName="content" padding negative content>
	{#if category.childCategories.length}
		<h2>sub category</h2>
		<ul>
			{#each category.childCategories as childCategory}
				<li>
					<a href={childCategory.absolutePath}>{childCategory.name}</a>
				</li>
			{/each}
		</ul>
	{/if}

	<h2>sub posts</h2>
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
