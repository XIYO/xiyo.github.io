<script>
	import Header from '$lib/Header.svelte';
	import Border from '$lib/Border.svelte';
	import { onMount } from 'svelte';
	const { post } = $props();


	let firstCommitDateString = $state(post.firstCommitDate);
	let lastCommitDateString = $state(post.lastCommitDate);

	onMount(() => {
		const locale = navigator.language; // 브라우저 언어 설정 가져오기

		const firstCommitDate = new Date(post.firstCommitDate);
		const lastCommitDate = new Date(post.lastCommitDate);

		// 날짜 형식 지정 (필요에 따라 수정)
		const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
		const dateTimeFormat = new Intl.DateTimeFormat(locale, dateFormatOptions);

		firstCommitDateString = dateTimeFormat.format(firstCommitDate);
		lastCommitDateString = dateTimeFormat.format(lastCommitDate);
	});
</script>

<Header>
	<h1>{post.title}</h1>
</Header>

<Border viewTransitionName="content" negative>
	<div class="meta">
		<div>
		최초 작성일: {firstCommitDateString}
		</div>
		<div>
		마지막 수정일: {lastCommitDateString}
		</div>
	</div>
	<div class="content padding">
	{@html post.convertedMarkdown}
	</div>
</Border>

<style>
	.meta {
			background-color: var(--color-primary);
			display: flex;
			flex-direction: column;
			align-items: end;
			gap: 0.5rem;

			padding-block: .5rem;
			padding-inline: 1rem;
	}
</style>
