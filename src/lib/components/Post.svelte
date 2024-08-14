<script>
	import Border from '$lib/ui/Border.svelte';
	import { onMount } from 'svelte';
	import BorderSubTitle from '$lib/ui/BorderSubTitle.svelte';

	const { post } = $props();

	let locale = 'ko';

	const firstCommitDate = new Date(post.gitLog[0].dateTime);
	const lastCommitDate = new Date(post.gitLog.at(-1).dateTime);

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
	<BorderSubTitle title={`last modify : ${lastCommitDateString}`} />

	<div class="content padding">
		{@html post.content}
	</div>
</Border>
