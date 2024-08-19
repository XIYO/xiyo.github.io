<script>
	import '$lib/stylesheet/app.css';
	import '$lib/stylesheet/view-transition.css';
	import Nav from '$lib/components/Nav.svelte';
	import { onNavigate } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import { page } from '$app/stores';
	import 'rehype-callouts/theme/github';
	import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';

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
	<Header title={$page.data.title} />
	{@render children()}
	<Footer />
</main>

<style>
	main {
		margin: var(--default-margin);

		@media (min-width: 769px) {
			margin-inline-end: calc(var(--nav-min-inline-size) + calc(var(--default-margin) * 2)) !important;
		}
	}
</style>
