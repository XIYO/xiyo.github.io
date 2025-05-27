<script>
	import { page } from '$app/state';
	import Card from '$lib/ui/card/Card.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { afterNavigate } from '$app/navigation';

	/** @type {HTMLDialogElement | undefined} */
	let navRef = $state();

	const handleShowNav = (e) => {
		e.preventDefault();
		navRef?.showModal();
	};

	const handleCloseNav = () => {
		afterNavigate(navRef?.close);
	};
</script>

<Card tag="header" class="flex justify-between items-center">
	<h1 class="font-black text-2xl uppercase p-4">{page.data.title}</h1>
	<a href="/nav" class="p-4" onclick={handleShowNav}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="36"
			height="36"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-menu-icon lucide-menu"
			><path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" /></svg
		>
		<span class="sr-only">Go to Nav</span>
	</a>
</Card>

<dialog
	bind:this={navRef}
	class="ml-auto sm:w-sm h-screen bg-surface text-surface-inverse backdrop:bg-black/50 max-h-none max-w-none w-screen"
>
	<form method="dialog" class="w-fit ml-auto">
		<button type="submit" class="p-4 block cursor-pointer">
			<span class="sr-only">Close Nav</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="36"
				height="36"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#000000"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
			>
		</button>
	</form>
	<Nav handleAfter={handleCloseNav} />
</dialog>
