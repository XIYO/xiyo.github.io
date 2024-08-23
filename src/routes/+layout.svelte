<script>
	import '$lib/stylesheet/app.css';
	import '$lib/stylesheet/view-transition.css';
	import Nav from '$lib/components/Nav.svelte';
	import { onNavigate } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import { page } from '$app/stores';
	import 'rehype-callouts/theme/github';

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
<Header title={$page.data.title} />
<main>
	{@render children()}
</main>
<Footer />

<style>
    :global(body) {
		margin: var(--default-margin);
		margin-inline-end: var(--default-margin);

		@media (768px <= width) {
			margin-inline-end: calc(var(--nav-min-inline-size) + calc(var(--default-margin) * 2));
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		:global(body) {
			transition: margin 0.5s;
		}
	}
</style>
