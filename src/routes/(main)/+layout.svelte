<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	const { children } = $props();
</script>

<Header />
<Sidebar />
{@render children()}
<Footer />
