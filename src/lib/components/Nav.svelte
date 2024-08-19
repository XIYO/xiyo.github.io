<script>
	import { page } from '$app/stores';
	import Border from '$lib/ui/Border.svelte';
</script>

<Border viewTransitionName="nav" tag="nav" id="nav" popover="manual">
	<div id="nav-header">
		<span class="padding">Menu</span>
		<button
			aria-label="Toggle navigation"
			popovertarget="border-outer-nav"
			popovertargetaction="hide"
		>
			<span class="no-css-only">메뉴 숨기기</span>
		</button>
	</div>

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
		<li aria-current={$page.url.pathname === '/globe' ? 'page' : undefined}>
			<a href="/globe">globe</a>
		</li>
	</ul>

	<footer class="padding">
		<a href="https://github.com/XIYO" target="_blank" aria-label="이요의 깃허브">
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
		margin: unset;

		position: fixed;
		z-index: 1; /* 내비게이션이 레이아웃에서 문맥상 가장 위에 있기 때문에 이후 요소에 덮힌다. 그래서 z-index 1, 사파리에서 발생 */

		/* 세로 */
		inset-block-start: var(--default-margin);
		block-size: calc(100dvh - (var(--default-margin) * 2));
		min-block-size: var(--nav-min-block-size);

		/* 가로 */
		inline-size: var(--nav-min-inline-size);
		inset-inline-start: calc(100% - (var(--nav-min-inline-size) + var(--default-margin)));
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

		#nav-header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			block-size: calc(2rem + (var(--default-padding) * 2) + var(--scroll-bar-size));

			button {
				/* reset */
				border: unset;
				padding: unset;

				background-color: var(--color-default-white);
				border-block-end: var(--default-border-width) solid var(--color-default-black);
				block-size: 100%;
				aspect-ratio: 1;

				&::after {
					content: '🏖️';
					display: inline-block;
					font-size: 1.5rem;
				}
			}
		}

		ul {
			flex-grow: 1;
			list-style-type: none;
			margin-block: unset;

			li {
				margin-block: var(--default-margin);

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
				svg {
					display: block;
					fill: var(--color-default-white);

					&:hover {
						fill: var(--color-primary);
					}
				}
			}
		}
	}

	/* 데스크톱 */
	@media (min-width: 769px) {
		:global(body:has(#border-outer-nav)) {
			margin-inline-end: calc(var(--nav-min-inline-size) + var(--default-margin));
		}

		button {
			pointer-events: none;
			/*opacity: 0;*/
		}
	}

	/* 태블릿 */
	@media (max-width: 768px) {
		:root:has(#border-outer-nav:not(:popover-open)) :global(#border-outer-nav) {
			/* 100%만써도 화면 밖으로 사라지는데, 데스크톱에스 스크롤바가 있다가 없어질 경우 100%를 사용하면 뷰 트랜지션시 내비게이션이 살짝 보임 */
			transform: translateX(calc(100% + var(--default-margin)));
		}

		button {
			cursor: pointer;
			&:hover {
				color: var(--color-primary);
			}
		}
	}

	/* 모바일 이상의 해상도 */
	@media (min-width: 426px) {
	}

	/* 모바일 해상도 */
	@media (max-width: 425px) {
	}

	/* 동작 활성화 모드일때만 트랜지션을 작동, 사용자를 존중 */
	@media (prefers-reduced-motion: no-preference) {
		:global(body) {
			transition: margin 0.5s;
		}

		:global(#border-outer-nav) {
			transition:
				inset 0.5s,
				transform 0.5s,
				block-size 0.5s;
		}

		button {
			transition: opacity 0.5s;
		}
	}
</style>
