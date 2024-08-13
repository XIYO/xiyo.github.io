<script>
	import Border from '$lib/Border.svelte';
	import { onMount } from 'svelte';

	const { post } = $props();

	let locale = 'ko';

	const firstCommitDate = new Date(post.frontmatter.firstCommitDate);
	const lastCommitDate = new Date(post.frontmatter.lastCommitDate);

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

<Border viewTransitionName="article" negative>
	<div class="highlight-background padding">
		<div class="time">
			<div>
				최초 작성일: {firstCommitDateString}
			</div>
			<div>
				마지막 수정일: {lastCommitDateString}
			</div>
		</div>
	</div>

	<div class="content padding">
		{@html post.convertedMarkdown}
	</div>
</Border>

<style>
	.time {
		text-align: end;
		font-variant-numeric: tabular-nums;
	}
</style>
