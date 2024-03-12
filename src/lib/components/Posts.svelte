<script>
	const { category } = $props();
</script>
<h1>발행물</h1>
<h2>주제</h2>
{#if !category.children.size}
	<div>주제가 없습니다.</div>
{:else}
	{#each category.children.values() as category}
		<div>
			<a href={category.getPathname()}>{category.name}</a>
		</div>
	{/each}
{/if}


<h2>글</h2>

{#if !category.allPosts.size}
	<div>글이 없습니다.</div>
{:else}
	{#each category.allPosts.keys() as key}
		<div>
			<a href={`${category.getPathname()}/${key}`}>{key}</a>
		</div>
	{/each}
{/if}