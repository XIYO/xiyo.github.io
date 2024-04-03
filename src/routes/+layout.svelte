<script>
	import 'gardevoir';
	import './styles.css';
	import Nav from '$lib/components/Nav.svelte';
	import { onNavigate } from '$app/navigation';
	import Footer from "$lib/components/Footer.svelte";

	onNavigate((navigation) => {
		if (!document.startViewTransition || navigation.to.route.id === navigation.from.route.id) return;

		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});

			transition.updateCallbackDone.then(() => {
				// alert('updateCallbackDone');
			});

			transition.ready.then(() => {
				// alert('ready');
			});

			transition.finished.then(() => {
				// alert('finished');
			});
		});
	});
</script>
<main>
	<slot />
</main>
<Nav />
<Footer></Footer>