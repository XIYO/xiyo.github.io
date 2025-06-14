<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/Header.svelte';

	// styles
	import '$lib/stylesheet/app.css';
	import '$lib/stylesheet/tailwind.css';

	const { children } = $props();
</script>

<Header />
{@render children()}
<Footer />
