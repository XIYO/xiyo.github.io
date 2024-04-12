<script>
	import Post from '$lib/components/Post.svelte';
	import Posts from '$lib/components/Posts.svelte';

	const { data } = $props();
</script>
{#if data.post}
	<Post post={data.post} />
{:else if data.category}
	<Posts category={data.category} />
{/if}