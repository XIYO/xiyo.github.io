<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/Header.svelte';

	const { children } = $props();
</script>

<Header />
{@render children()}
<Footer />
