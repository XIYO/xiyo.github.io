<script>
	import Border from '$lib/ui/Border.svelte';
	import { onMount } from 'svelte';
	import 'highlight.js/styles/github-dark.css';

	const { post } = $props();

	let locale = 'ko';

	const firstCommitDate = new Date(post.data.gitLog.at(-1).datetime);
	const lastCommitDate = new Date(post.data.gitLog.at(0).datetime);

	const dateFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
	let dateTimeFormat = new Intl.DateTimeFormat(locale, dateFormatOptions);

	let firstCommitDateString = $state(dateTimeFormat.format(firstCommitDate));
	let lastCommitDateString = $state(dateTimeFormat.format(lastCommitDate));

	onMount(() => {
		locale = navigator.language; // 브라우저 언어 설정 가져오기

		dateTimeFormat = new Intl.DateTimeFormat(locale, dateFormatOptions);

		firstCommitDateString = dateTimeFormat.format(firstCommitDate);
		lastCommitDateString = dateTimeFormat.format(lastCommitDate);
	});
</script>

<Border viewTransitionName="post" negative>
	<div id="post-content" class="content padding">
		{@html post.value}
	</div>

	<div id="post-footer" class="highlight-background">
		<div>
			<div>first commit : {firstCommitDateString}</div>
			<div>last commit : {lastCommitDateString}</div>
		</div>
	</div>
</Border>

<style>
	@import 'https://unpkg.com/@kfonts/neodgm-code/index.css';

	:global(#border-outer-post) {
		margin-block: var(--default-margin);
	}

	:global(#post-footer) {
		padding: var(--default-padding);

		& > div {
			overflow-x: scroll;

			&::-webkit-scrollbar-thumb {
				background-color: var(--color-default-black);
			}

			&::-webkit-scrollbar-thumb:hover {
				background-color: #494949;
			}
		}

		/* typography */
		text-align: end;
		font-variant-numeric: tabular-nums;
		text-transform: uppercase;
		text-wrap: nowrap;
	}
</style>
