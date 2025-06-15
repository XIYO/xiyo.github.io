<script>
	import { page } from '$app/state';
	// import '$lib/stylesheet/app.css';
	import '$lib/stylesheet/tailwind.css';

	const { children } = $props();
</script>

<svelte:head>
	<title>{page.data.title}</title>
	<meta content={page.data.description} name="description" />
	<link href={page.url.origin + page.url.pathname} rel="canonical" />
	{#if page.data.og.title}
		<meta property="og:title" content={page.data.og.title} />
	{/if}
	{#if page.data.og.description}
		<meta property="og:description" content={page.data.og.description} />
	{/if}
	{#if page.data.og.type}
		<meta property="og:type" content={page.data.og.type} />
	{/if}
	{#if page.data.og.url}
		<meta property="og:url" content={page.data.og.url} />
	{/if}
	{#if page.data.og.imageUrl}
		<meta property="og:image" content={page.data.og.imageUrl} />
	{/if}
	{#if page.data.og.author}
		<meta property="article:author" content={page.data.og.author} />
	{/if}
	{#if page.data.og.publishedTime}
		<meta property="article:published_time" content={page.data.og.publishedTime} />
	{/if}
	{#if page.data.og.modifiedTime}
		<meta property="article:modified_time" content={page.data.og.modifiedTime} />
	{/if}
	{#if page.data.og.section}
		<meta property="article:section" content={page.data.og.section} />
	{/if}
	{#if page.data.og.tags}
		{#each page.data.og.tags as tag (tag)}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
	<!--{#if page.data.og.keywords}-->
	<!--	<meta name="keywords" content={page.data.og.keywords} />-->
	<!--{/if}-->
</svelte:head>

{@render children()}
