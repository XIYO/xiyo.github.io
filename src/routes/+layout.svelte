<script>
	import '$lib/stylesheet/app.css';
	import Nav from '$lib/components/Nav.svelte';
	import { onNavigate } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import { page } from '$app/stores';

	const { children } = $props();

	onNavigate((navigation) => {
		if (
			!document.startViewTransition ||
			navigation.to.url.pathname === navigation.from.url.pathname
		)
			return;

		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});

			transition.updateCallbackDone.then(() => {});

			transition.ready.then(() => {});

			transition.finished.then(() => {});
		});
	});
</script>

<svelte:head>
	<title>{$page.data.title}</title>
</svelte:head>

<Nav />
<main>
	<Header>
		{$page.data.title}
	</Header>
	{@render children()}
</main>
<Footer></Footer>
