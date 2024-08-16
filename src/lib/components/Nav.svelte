<script>
	import { page } from '$app/stores';
	import Border from '$lib/ui/Border.svelte';
</script>

<Border viewTransitionName="nav" tag="nav" id="nav" popover>
	<button aria-label="Toggle navigation" popovertarget="border-outer-nav" popoveraction="hide">
		<span class="padding">Menu</span>
		<span id="nav-toggle-span">
			<svg id="nav-toggle-svg" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
				<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
				<path
					d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
				/>
			</svg>
		</span>
	</button>

	<ul class="padding content negative">
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<a href="/">home</a>
		</li>
		<li aria-current={$page.url.pathname.startsWith('/posts') ? 'page' : undefined}>
			<a href="/posts">posts</a>
		</li>
		<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
			<a href="/about">about</a>
		</li>
		<li aria-current={$page.url.pathname === '/glove' ? 'page' : undefined}>
			<a href="/glove">glove</a>
		</li>
	</ul>

	<footer class="padding">
		<a href="https://github.com/XIYO" target="_blank">
			<svg width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
				<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
				<path
					d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
				/>
			</svg>
		</a>
	</footer>
</Border>

<style>
	/* 내비게이션은 보이는 상태를 스타일링 하고, (input:checked) 움직였을 때의 상태는 추가 스타일링(아래)으로 한다 */
	/* body 는 내비게이션이 보이지 않는 상태를 스타일링 하고, 보이는 상태일 때(input:not(checked))를 스타일링하여 내비게이션의 여백을 확보한다 */
	:global(#border-outer-nav) {
			/* popover rest */
		display: block;
		border: unset;

		position: fixed;
		/*
						내 생각에는 fixed 는 position 중에서 가장 최상위 레이어에 놓아져야한다 생각하는데,
						문맥상 먼저 선언되면(최상위 +layout.svelte 에서 nav 가 가장 먼저 선언) 다른 다음 요소 밑에 깔리는 일이 발생.
						사파리는 문제 없는데 엣지는 문제 발생해서 z-index 를 줌
						그리고 사파리에서도 header 의 svg 보다 밑에 깔림... 이건 버그?
						*/
		z-index: 1;

		/* 세로 */
		inset-block: 0;

		/*block-size: calc(100% - (var(--default-margin-block) * 2));*/
		block-size: calc(100dvh - (var(--default-margin-block) * 2)); /* 왜 처음부터 이걸 안썻는지 무슨 문제가 있엇는게 기억이 안남	*/
		min-block-size: var(--nav-min-block-size);

		/* 가로 */
		inset-inline-start: calc(100% - (var(--nav-min-inline-size) + var(--default-margin-block) * 2));
		inset-inline-end: 0;
		min-inline-size: var(--nav-min-inline-size);
		margin-inline: var(--default-margin-block);
	}

	:global(#border-content-nav) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		font-size: 1.25em;
		font-weight: 700;

		overflow-wrap: break-word;
		user-select: none;
		text-transform: uppercase;

		& > button {
				/* reset */
				padding-inline: unset;
				border: unset;
				background: transparent;
				font: unset;
				text-transform: unset;
				color: unset;

			cursor: pointer;
			fill: var(--color-default-black);

			&:hover {
				color: var(--color-primary);
				fill: var(--color-primary);
			}

			display: flex;
			justify-content: space-between;
			align-items: center;

			& > span:last-child {
				block-size: 100%;
				background-color: var(--color-default-white);
				border-start-end-radius: var(--inner-border-radius);

				display: flex;
				justify-content: center;
				align-items: center;

				border-block-end-style: solid;
				border-block-end-width: var(--default-border-width);
				border-block-end-color: var(--color-default-black);
				box-sizing: border-box;

				& > svg {
					padding-inline: var(--default-margin-block);
					block-size: 100%;
				}
			}
		}

		ul {
			flex-grow: 1;
			list-style-type: none;
			margin-block: unset;

			li {
				margin-block: var(--default-margin-block);

				&[aria-current='page'] {
					color: var(--color-primary);
				}
			}
		}

		footer {
			display: flex;
			justify-content: center;
			align-items: center;

			a {
				font-size: 0; /* 폰트 사이즈 0을 주지 않으면 영역이 튀어나옴 */

				svg {
					fill: var(--color-default-white);

					&:hover {
						fill: var(--color-primary);
					}
				}
			}
		}
	}

	/* #nav-toggle:not(:checked) 상태의 내비게이션 스타일링 */
	:root:has(#border-outer-nav:not(:popover-open)) :global(#border-outer-nav) {
		/* 100%만써도 화면 밖으로 사라지는데, 데스크톱에스 스크롤바가 있다가 없어질 경우 100%를 사용하면 뷰 트랜지션시 내비게이션이 살짝 보임 */
		transform: translateX(calc(100% + var(--default-margin-block)));
	}

	:root:has(#border-outer-nav:popover-open) #nav-toggle-svg {
		rotate: 180deg;
	}

	/* 내비게이션이 보이는 상태일 때의 스타일링
			body 기본 의 스타일링은 전체를 사용하도록 디자인 되어 있어서, 내비게이션 컴포넌트에서 적절히 제어를 하여 공간을 확보해준다.
			 */
	@media (min-width: 426px) {
		/* 내비게이션이 나타났을 때 본문이 덮혀서 안 보이는 일이 없도록 마진을 줘서 옆으로 밀어준다 */
		:global(body:has(#border-outer-nav:popover-open)) {
			/* 상수 2는 nav 에 좌우에 여백이 두 개 있기 때문 */
			margin-inline-end: calc(var(--nav-min-inline-size) + (var(--default-margin-block) * 2));
		}

		#nav-toggle-span {
			/* 내비게이션 헤더의 내비 하이드 쇼 버튼을 모바일 초과 해상도에서는 안 보이게 한다 */
			opacity: 0;
		}
	}

	/* 모바일 해상도 */
	@media (max-width: 425px) {
			/* popover 로 바꾸고 난 뒤부터 인셋으로 사이즈 조절이 안댐 */
		/*:global(#border-outer-nav) {*/
		/*	inset-inline: 0;*/
		/*}*/

		#nav-toggle-span {
			/* 내비게이션 헤더의 내비 하이드 쇼 버튼을 모바일 초과 해상도에서는 보이게 한다 */
			opacity: 1;
		}
	}

	/* 동작 활성화 모드일때만 트랜지션을 작동, 사용자를 존중 */
	@media (prefers-reduced-motion: no-preference) {
		:global(body) {
			transition: margin 0.5s;
		}

		:global(#border-outer-nav) {
			transition:
				block-size 0.5s,
				transform 0.5s,
				block-size 0.5s,
				inline-size 0.5s,
				inset 0.5s;
		}

		#nav-toggle-span {
			transition: opacity 0.5s;

			#nav-toggle-svg {
				transition: rotate 0.5s;
			}
		}
	}
</style>
