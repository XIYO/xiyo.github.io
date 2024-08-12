<script>
	import Border from '$lib/Border.svelte';

	const { children, tag = 'h1' } = $props();
</script>

<Border id="header" viewTransitionName="header" tag="header">
	<svelte:element this={tag}>
		{@render children()}
	</svelte:element>
	<label
		style="--view-transition-name: header-label;"
		aria-label="Close navigation"
		for="nav-toggle"
	>
		<svg width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
			<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
			<path
				d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
			/>
		</svg>
	</label>
</Border>

<style>
	:global(#border-outer-header) {
		:global(& > #border-inner-header) {
			display: flex;
			justify-content: space-between;

			/* slot 으로 들어온 첫 번째 요소에 대한 핸들링 */

			:global(& > :first-child) {
				/* 내부에서 스크롤이 생길경우 보더에 가려지지 않도록 한다. */
				margin-inline: var(--default-padding);
				padding-block: var(--default-padding);
				margin-block: 0;
				text-transform: uppercase;

				overflow-x: scroll; /* 의도적으로 스크롤을 노출하여 스크롤 높이도 미리 계산 하도록 한다 */
				word-break: keep-all;
				white-space: nowrap;
			}

			label {
				background-color: var(--color-default-white);
				color: var(--color-default-black);

				/*
												뷰 트랜지션시에 내비게이션 버튼은 사라지지 않도록 하고싶은데,
												그렇게 하려면 뷰 트랜지션 요소를 적용해야하는데, 그렇게 하면 애니메이션 중간에 모서리가 나오게 됨
												그래서 오른쪽을 라운딩 처리.
												TODO: 미래에 뷰 트랜지션시 요소를 중첩하여 자식 요소로 넣을 수 있으면 좀 더 멋진 코드로 작성 가능...
												 */
				border-start-end-radius: 1rem;
				border-end-end-radius: 1rem;

				cursor: pointer;
				user-select: none;

				display: flex;
				justify-content: center;
				align-items: center;

				/* 하위 svg 요소의 기본 색상을 지정 */
				fill: var(--color-default-black);

				&:hover {
					/* 하위 svg 요소의 호버 색상을 지정 */
					fill: var(--color-primary);
				}

				svg {
					padding-inline: var(--default-margin-block);
				}
			}
		}
	}

	:global(body:has(input#nav-toggle:checked)) {
		svg {
			rotate: 180deg;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		svg {
			transition: rotate 0.5s;
		}
	}
</style>
