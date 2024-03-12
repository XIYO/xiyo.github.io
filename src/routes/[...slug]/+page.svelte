<script>
	import Post from '$lib/components/Post.svelte';
	import Posts from '$lib/components/Posts.svelte';

	const { data } = $props();

	let markdown = $state(data.markdown);
	let category = $state(data.category)
	$effect(() => {
		markdown = data.markdown;
		category = data.category;
	});
</script>

{#if markdown}
	<Post {markdown} />
{:else if category}
	<Posts {category} />
{/if}