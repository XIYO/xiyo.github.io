<script>
	import './styles.css';
	import Nav from '$lib/components/Nav.svelte';
	import { onNavigate } from '$app/navigation';
	import Footer from "$lib/components/Footer.svelte";

	onNavigate((navigation) => {
		if (!document.startViewTransition || navigation.to.url.pathname === navigation.from.url.pathname) return;


		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});

			transition.updateCallbackDone.then(() => {
				// alert('updateCallbackDone');
				const contentContainer = document.querySelector('main .content');
			});

			transition.ready.then(() => {
				const contentContainer = document.querySelector('main .content');
			});

			transition.finished.then(() => {
				const contentContainer = document.querySelector('main .content');
			});
		});
	});
</script>
<main>
	<slot />
</main>
<Nav />
<Footer></Footer>