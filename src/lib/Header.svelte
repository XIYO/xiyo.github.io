<script>
	import Border from '$lib/ui/Border.svelte';

	const { title, tag = 'h1' } = $props();
</script>

<Border id="header" viewTransitionName="header" tag="header">
	<h1>{title}</h1>

	<button aria-label="Toggle navigation" popovertarget="border-outer-nav" popovertargetaction="toggle">
		<span class="no-css-only">메뉴 토글</span>
	</button>
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
			margin-inline: var(--default-padding);

			align-content: center;
			text-transform: uppercase;

			overflow-x: scroll; /* 의도적으로 스크롤을 노출하여 스크롤 높이도 미리 계산 하도록 한다 */
			text-wrap: nowrap;
		}

		button {
			/* reset */
			border: unset;
			padding: unset;

			block-size: 100%;
			aspect-ratio: 1;
			background-color: var(--color-default-white);

			&::after {
				content: '⛱️';
				display: inline-block;
				font-size: 1.5rem;
			}
		}
	}

  @media (prefers-reduced-motion: no-preference) {
      button {
          transition: opacity var(--default-animation-duration)
      }
  }

  @media (min-width: 769px) {
      button {
          pointer-events: none;
          opacity: 0;
      }
  }

  @media (max-width: 768px) {
      button {
          cursor: pointer;
      }
  }
</style>
