<script>
	import Header from '$lib/Header.svelte';
	import Border from '$lib/Border.svelte';
	const { post } = $props();
</script>

<Header>
	<h1>{post.title}</h1>
</Header>

<Border viewTransitionName="content" negative content padding>
	{@html post.convertedMarkdown}
</Border>
