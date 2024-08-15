<script>
	const { title } = $props();
</script>

<div class="highlight-background content">
	<h2>{title}</h2>
</div>

<style>
	div {
		block-size: 3.5rem;

		h2 {
			/* reset */
			margin-block: 0;
			margin-inline: var(--default-padding);

			block-size: 100%;

			align-content: center;
			text-transform: uppercase;

			overflow-x: scroll; /* 의도적으로 스크롤을 노출하여 스크롤 높이도 미리 계산 하도록 한다 */
			text-wrap: nowrap;

			&::-webkit-scrollbar-thumb {
				background-color: var(--color-default-black);
			}

			&::-webkit-scrollbar-thumb:hover {
				background-color: #494949;
			}
		}
	}
</style>
