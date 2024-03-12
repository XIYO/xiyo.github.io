<script>
	import './styles.css';
	import Nav from '$lib/components/Nav.svelte';
	import { onNavigate } from '$app/navigation';

	export let data;

	const category = data.category;

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
<Nav {category} />