<script>
	import svelteLogo from '$lib/assets/svelteLogo.svg';
</script>

<footer>
	Made By
	<a href="https://svelte.dev" target="_blank">Svelte Rune<img src={svelteLogo} alt="svelte logo"/></a>
	, Designed By chimi
	<label>
		<input type="checkbox" hidden />
	</label>
</footer>

<style>
		img {
				block-size: 1rem;
				inline-size: auto;
				aspect-ratio: 1;
		}

	footer {
		font-size: 0.75rem;
		text-align: center;
		margin-block: var(--default-margin-block);

		view-transition-name: footer;
		view-transition-class: after-view-transition;

		user-select: none;
	}

	label {
		cursor: pointer;

		&::after {
			content: '🎈';
		}

		&:has(input:checked)::after {
			content: '💥';
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		label {
			display: inline-block;
			animation: float 3s infinite linear;

			&:has(input:checked) {
				animation-play-state: paused;
			}
		}
	}

	@keyframes float {
		25% {
			transform: translateY(25%);
		}

		75% {
			transform: translateY(-25%);
		}
	}
</style>
