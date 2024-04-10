<script>
	import Post from '$lib/components/Post.svelte';
	import Posts from '$lib/components/Posts.svelte';

	const { data } = $props();

	let post = $state(data.post);
	let category = $state(data.category)
	$effect(() => {
		post = data.post;
		category = data.category;
	});
</script>
{#if post}
	<Post {post} />
{:else if category}
	<Posts {category} />
{/if}