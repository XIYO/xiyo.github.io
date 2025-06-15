<script>
	import Post from '$lib/components/Post.svelte';
	import Posts from '$lib/components/Posts.svelte';

	const { data } = $props();
</script>

{#if data.postMetadata && data.postContent}
	<Post postMetadata={data.postMetadata} postContent={data.postContent} />
{:else if data.category}
	<Posts category={data.category} />
{/if}
