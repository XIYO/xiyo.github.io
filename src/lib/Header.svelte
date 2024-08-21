<script>
	import Border from '$lib/ui/Border.svelte';
	import NavButton from '$lib/components/NavButton.svelte';

	const { title, tag = 'h1' } = $props();
</script>

<Border id="header" viewTransitionName="header" tag="header">
	<h1>{title}</h1>

	<NavButton popovertargetaction="toggle" />
</Border>

<style>
	:global(#border-outer-header) {
		margin-block: var(--default-margin);
	}

	:global(#border-content-header) {
		display: flex;
		justify-content: space-between;

		block-size: 4rem;

		h1 {
			/* reset */
			margin-block: 0;

			padding: var(--default-padding);
			margin-block-end: 4px; /* 스크롤이 바닥에 붙지 않기 위해 */

			align-content: center;
			text-transform: uppercase;

			overflow-x: scroll; /* 의도적으로 스크롤을 노출하여 스크롤 높이도 미리 계산 하도록 한다 */
			text-wrap: nowrap;
		}
	}
</style>
