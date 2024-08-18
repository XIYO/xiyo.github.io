<footer>
	Made By
	<a id="made-by" href="https://svelte.dev" target="_blank">Svelte Rune</a>, Designed By
	<label>
		chimi
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

	#made-by::after {
		content: '';
		display: inline-block;
		margin-inline-start: 0.25rem;
		width: 1rem;
		height: 1rem;
		background-image: url('/svelte-logo.svg');
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		vertical-align: middle;
	}

	label {
		cursor: pointer;
		text-align: center;
		align-content: center;

		&::after {
			content: '🎈';
			display: inline-block;
			margin-inline-start: 0.25rem;
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
