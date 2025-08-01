<script>
	import { page } from '$app/state';
	import Nav from '$lib/components/Nav.svelte';
	import { afterNavigate } from '$app/navigation';
	import { deLocalizeHref } from './paraglide/runtime';
	import * as m from '$lib/paraglide/messages.js';

	/** @type {HTMLDialogElement} */
	let navRef;

	let isRoot = $derived(deLocalizeHref(page.url.pathname) === '/');

	// Get title dynamically to ensure it updates with language changes
	const title = $derived(m.title());

	/**
	 * Progressive Enhancement(점진적 향상) 패턴 적용.
	 *
	 * - JS 환경(SPA): 기본 내비게이션을 막고 모달을 띄움
	 * - JS 미지원 환경(SSR/정적): 표준 링크 이동 허용
	 *
	 * @param {MouseEvent} e
	 */
	const handleShowNav = (e) => {
		e.preventDefault();
		navRef.showModal();
	};

	const handleConfetti = async () => {
		// 성능 최적화: 동적 import로 번들 크기 감소
		const { default: confetti } = await import('canvas-confetti');
		confetti({
			particleCount: 120,
			spread: 90,
			origin: { y: 0.6 }
		});
	};

	afterNavigate(() => {
		navRef.close();
	});
</script>

<header class="bg-primary-500 text-white border-b sticky top-0 flex h-16">
	{#if !isRoot}
		<a href="./" class="w-16 text-center content-center-safe">
			<span class="text-3xl">✈️</span>
			<span class="sr-only">Go Up</span>
		</a>
	{:else}
		<button class="w-16 text-center content-center-safe" onclick={handleConfetti}>
			<span class="text-3xl">🪂</span>
			<span class="sr-only">Home</span>
		</button>
	{/if}
	<h1 class="flex-1 text-center content-center-safe font-black text-2xl uppercase">
		{title}
	</h1>
	<a href="/nav" class="w-16 text-center content-center-safe" onclick={handleShowNav}>
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
			class="inline lucide lucide-menu-icon lucide-menu"
			><path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" /></svg
		>
		<span class="sr-only">Go to Nav</span>
	</a>
</header>

<dialog
	bind:this={navRef}
	class="ml-auto sm:w-sm h-screen preset-filled-surface-50-950 backdrop:bg-black/50 max-h-none max-w-none w-screen"
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
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
			>
		</button>
	</form>
	<Nav />
</dialog>
