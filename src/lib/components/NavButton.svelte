<script>
	/**
	 * @type {{ popovertargetaction: 'toggle' | 'hide' | 'show' | null | undefined }}
	 */
	const { popovertargetaction } = $props();
</script>

<button aria-label="Toggle navigation" popovertarget="border-outer-nav" {popovertargetaction}>
	<span class="no-css-only">menu {popovertargetaction}</span>
</button>

<style>
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

		@media (prefers-reduced-motion: no-preference) {
			transition: opacity var(--default-animation-duration);
		}

		@media (768px < width) {
			pointer-events: none;
			opacity: 0;
		}

		@media (width <= 768px) {
			cursor: pointer;
		}
	}

	:global(nav) button::after {
		content: '🏖️';
	}

	.no-css-only {
		display: none;
	}
</style>
