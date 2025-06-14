<script>
	import { page } from '$app/state';

	// components
	import Nav from '$lib/components/Nav.svelte';
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
