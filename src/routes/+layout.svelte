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
	<meta name="og:title" content={$page.data.title} />
</svelte:head>

<Nav />
<div id="container-content">
	<Header title={$page.data.title} />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	#container-content {
		margin: var(--default-margin);
		margin-inline-end: var(--default-margin);

	}

	/* 최초의 컨테이너라서 컨테이너 쿼리로 지정할 수 없어 미디어 쿼리로 사이즈를 조절한다 */
	/*!* 소형 모니터 이상 *!*/
	@media (1024px <= width) {
		#container-content {
			margin-inline-end: calc(var(--nav-min-inline-size) + calc(var(--default-margin) * 2));
		}
	}

	/* 소형 모니터 미만 */
  @media (width < 1024px) {
  	:root:has(#border-outer-nav:not(:popover-open)) :global(#border-outer-nav) {
			/* 화면밖으로 나갈때 사진의 영역 + 마진 까지 계산 */
  		transform: translateX(calc(100% + var(--default-margin)));
  	}
  }

  /* 태블릿 이상 해상도 */
  @media (768px <= width) {
  }

  /* 태블릿 미만 해상도 */
  @media (width < 768px) {
  }

  /* 모바일 이상 해상도 */
  @media (425px <= width) {
  }

  /* 모바일 미만 해상도 */
  @media (width < 425px) {
  }

	@media (prefers-reduced-motion: no-preference) {
		#container-content {
			transition: margin 0.5s;
		}
	}
</style>
