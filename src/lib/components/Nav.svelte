<script>
    import {page} from '$app/stores';
</script>

<input checked={false} hidden id="nav-toggle" type="checkbox">
<div
        id="nav"
        class="border-outer"
        style="view-transition-name: border-outer-nav;"
>
    <nav
            style="--view-transition-name: border-inner-nav;"
    >
        <label class="padding" aria-label="Close navigation" for="nav-toggle">
            Menu
        </label>

        <ul class="padding content">
            <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
                <a href="/">home</a>
            </li>
            <li aria-current={$page.url.pathname === '/posts' ? 'page' : undefined}>
                <a href='/posts'>posts</a>
            </li>
            <li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
                <a href="/about">about</a>
            </li>
        </ul>

        <div class="footer padding">
            <a href="https://github.com/XIYO" target="_blank">
                <svg width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                </svg>
            </a>
        </div>
    </nav>
</div>

<style>
    /* 내비게이션은 보이는 상태를 스타일링 하고, (input:checked) 움직였을 때의 상태는 추가 스타일링(아래)으로 한다 */
    .border-outer {
        position: fixed;
        /*
        내 생각에는 fixed 는 position 중에서 가장 최상위 레이어에 놓아져야한다 생각하는데,
        문맥상 먼저 선언되면(최상위 +layout.svelte 에서 nav 가 가장 먼저 선언) 다른 다음 요소 밑에 깔리는 일이 발생.
        사파리는 문제 없는데 엣지는 문제 발생해서 z-index 를 줌
        그리고 사파리에서도 header 의 svg 보다 밑에 깔림... 이건 버그?
        */
        z-index: 1;

        /* 세로 */
        /*
        start 만 제어하고 end 는 제어하지 않는다.
        이유는 트랜지션을 사용할 수 없기 때문에 block-size 를 이용하여 뷰 포트의 높이 변화시 트랜지션을 주기 위함(ex 아이폰 주소창 사라질 때)

        깔끔한 코드, 하지만 뷰포트가 변화되었을때 블록 사이즈에 대한 트랜지션을 줄 수 없다.
        inset-block: 0;
        margin-block: var(--margin-default-block);
         */
        inset-block: 0;
        block-size: calc(100dvh - (var(--margin-default-block) * 2));
        min-block-size: var(--min-height); /* 최소 블록 사이즈에 대한 제어만 한다. */

        /* 가로 */
        inline-size: var(--width-default-nav);
        /* 세로 모드 */
        /* 사파리에 가로모드에서 세로 모드가 될때는 inset-inline-start 가 있어야 요소가 깜박 거리지 않음 */
        @media (orientation: portrait) {
            inset-inline-start: calc(100% - (var(--width-default-nav) + var(--margin-default-block) * 1));
        }

        /* 가로 모드 */
        /* 사파리에 세로모드에서 가로 모드가 될때는 inset-inline-end 가 있어야 요소가 깜박 거리지 않음 */
        @media (orientation: landscape) {
            inset-inline-end: var(--margin-default-block);
        }

        & >:only-child {
            block-size: 100%;

            display: flex;
            flex-direction: column;
            justify-content: space-between;

            font-size: 1.25em;
            font-weight: 700;

            overflow-wrap: break-word;
            user-select: none;
            text-transform: uppercase;

            label {
                cursor: pointer;

                &:hover {
                    color: var(--color-primary);
                }
            }

            ul {
                flex-grow: 1;
                list-style-type: none;
                margin-block: unset;

                li {
                    margin-block: var(--margin-default-block);

                    &[aria-current="page"] {
                        color: var(--color-primary);
                    }
                }
            }

            .footer {
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
    }

    /* #nav-toggle:not(:checked) 상태의 내비게이션 스타일링 */
    :global(body:has(#nav-toggle:not(:checked))) {
        .border-outer {

            /* 100%만써도 화면 밖으로 사라지는데, 데스크톱에스 스크롤바가 있다가 없어질 경우 100%를 사용하면 뷰 트랜지션시 내비게이션이 살짝 보임 */
            transform: translateX(calc(100% + var(--margin-default-block)));
        }
    }

    /* 내비게이션이 보이는 상태일 때의 스타일링
    body 기본 의 스타일링은 전체를 사용하도록 디자인 되어 있어서, 내비게이션 컴포넌트에서 적절히 제어를 하여 공간을 확보해준다.
     */
    @media (min-width: 426px) {
        /* 내비게이션이 나타났을 때 본문이 덮혀서 안 보이는 일이 없도록 마진을 줘서 옆으로 밀어준다 */
        :global(body:has(#nav-toggle:checked)) {
            /* 상수 2는 nav 에 좌우에 여백이 두 개 있기 때문 */
            margin-inline-end: calc(var(--width-default-nav) + (var(--margin-default-block) * 2));
        }
    }

    /* 모바일 해상도 */
    @media (max-width: 425px) {
        :global(body) {
            .border-outer {
                inset-inline-start: 0;
                margin-inline: var(--margin-default-block);

                inline-size: calc(100% - (var(--margin-default-block) * 2));
                min-inline-size: var(--min-width); /* 최소 높이는 기본 옵션으로 지정되어 있기 때문에 최소 인라인 사이즈만 지정 */
            }
        }
    }

    /* 동작 활성화 모드일때만 트랜지션을 작동, 사용자를 존중 */
    @media (prefers-reduced-motion: no-preference) {
        :global(body) {
            transition: margin .5s;

            .border-outer {
                transition: block-size .5s, transform .5s;
            }
        }
    }
</style>
