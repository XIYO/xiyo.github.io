<script>
	import { datetime } from '$lib/paraglide/registry.js';
	import { getLocale } from '$lib/paraglide/runtime.js';

	const { gitLog } = $props();

	const firstCommitDate = new Date(gitLog.at(0).datetime);

	/** @type {Intl.DateTimeFormatOptions} */
	const dateFormatOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };
	const firstCommitDateString = datetime(getLocale(), firstCommitDate, dateFormatOptions);
</script>

<footer>
	<div id="by">
		Made By
		<a id="made-by" href="https://svelte.dev" target="_blank">Svelte Rune</a>, Designed By
		<span id="design-by" tabindex="-1">
			{#each 'chimi' as letter, i (i)}
				<span style:--delay={i}>{letter}</span>
			{/each}
		</span>
	</div>
	<div id="git-log">
		<span><span class="heading">last commit :</span> {firstCommitDateString}</span>
		<span><span class="heading">comment :</span> {gitLog.at(0).comment}</span>
	</div>
</footer>

<style>
	footer {
		font-size: 0.75rem;
		text-align: center;
		margin-block: var(--default-margin);

		view-transition-name: footer;
		view-transition-class: after-view-transition;

		user-select: none;
	}

	#by {
		margin-block-end: var(--default-margin);
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

	#design-by {
		text-align: center;
		align-content: center;

		&::after {
			content: '🎈';
			display: inline-block;
			margin-inline-start: 0.25rem;
		}

		&:not(:focus) {
			cursor: pointer;
		}

		&:focus::after {
			content: '💥';
		}
	}

	#git-log {
		text-align: end;

		& > * {
			display: block;
		}

		.heading {
			text-transform: uppercase;
			font-weight: bold;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		#design-by {
			span {
				display: inline-block;
				animation: float 3s infinite linear;
				animation-delay: calc(var(--delay) * 0.25s);
			}

			&:focus {
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
