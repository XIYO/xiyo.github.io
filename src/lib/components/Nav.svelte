<script>
    import {page} from '$app/stores';

    const checked = true;
</script>

<input bind:checked={checked} hidden id="nav-toggle" type="checkbox">
<nav class="border invert margin">
    <label class="header padding" aria-label="Close navigation" for="nav-toggle">
        MENU
    </label>
    <ul class="invert padding content">
        <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
            <a data-sveltekit-keepfocus href="/">HOME</a>
        </li>
        <li aria-current={$page.url.pathname === '/posts' ? 'page' : undefined}>
            <a data-sveltekit-keepfocus href='/posts'>POSTS</a>
        </li>
        <li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
            <a data-sveltekit-keepfocus href="/about">ABOUT</a>
        </li>
    </ul>
    <div class="footer padding">
        <a href="https://github.com/XIYO">
            <svg width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
            </svg>
        </a>
    </div>
</nav>

<style>
    :global(body) {
        /** 상수 3을 하는 이유는 인라인 마진이 블록 마진의 0.5배이며, 내비게이션이 총 3개의 인라인 마진을 가지고 있기 때문 */
        margin-inline-end: calc(var(--width-default-nav) + (var(--margin-default-inline) * 3));
    }

    nav {
        position: fixed;

        /* 세로 위치 높이 */
        inset-block-start: 0;
        height: calc(100dvh - (var(--margin-default-block) * 2));
        width: var(--width-default-nav);

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        /* 윈도우 엣지에 스크롤 영역이 계산되지 않는 100dvh 때문에 아래 코드는 일딴 추석 */
        inset-inline-end: var(--margin-default-inline);

        /* TODO: 엣지 버그, 100lvw 가 스크롤 영역을 포함하여 계산됨 가져가고 있음
        100%를 사용하면 사파리에서 가로모드 세로모드 전환시 계산을 할 수 없어서 내비게이션이 잠깐 사라지는 버그가 있음
            */
        /* 가로 위치 넓이 */
        /* 사파리에 가로모드에서 세로 모드가 될때는 inset-inline-start 가 있어야 요소가 깜박 거리지 않음 */
        /*@media (orientation: portrait) {*/
        /*    inset-inline-start: calc(100vw - (var(--width-default-nav) + (var(--margin-default-inline) * 3)));*/
        /*}*/

        /* 사파리에 세로모드에서 가로 모드가 될때는 inset-inline-end 가 있어야 요소가 깜박 거리지 않음 */
        /*@media (orientation: landscape) {*/
        /*    inset-inline-end: var(--margin-default-inline);*/
        /*}*/

        font-size: 1.25em;
        font-weight: 700;

        overflow-wrap: break-word;
        user-select: none;

        .header::after {
            content: '📌';
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
            a {
                font-size: 0; /* 폰트 사이즈 0을 주지 않으면 영역이 튀어나옴 */
            }

            svg {
                fill: var(--color-default-white);
            }
        }
    }

    @media (max-width: 1024px) {
        nav label {
            cursor: pointer;
        }

        input[type="checkbox"]:not(:checked) ~ nav > label::after {
            filter: grayscale(100%);
        }
    }

    @media (min-width: 426px) and (max-width: 1024px) {
        input[type="checkbox"]:not(:checked) ~ nav {
            transform: translateX(calc(var(--ratio-three-quarters-of-three-quarter) * 100%));

            &:hover, &:focus-within {
                transform: unset;
            }
        }

        :global(body:has(input[type="checkbox"]:not(:checked))) {
            margin-inline-end: calc((var(--width-default-nav) * var(--ratio-eighth)) + (var(--margin-default-inline) * 3));
        }
    }

    @media (max-width: 425px) {
        nav {
            /*position: initial;*/
            position: unset;

            label {
                cursor: unset;
            }
        }

        :global(body) {
            margin-inline-end: var(--margin-default-inline);
        }
    }

    /* 동작 활성화 모드일때만 트랜지션을 작동, 사용자를 존중 */
    @media (prefers-reduced-motion: no-preference) {
        :global(body) {
            transition: margin 0.25s ease-in-out;
        }

        input[type="checkbox"] ~ nav > label::after {
            transition: filter 0.25s ease-in-out;
        }

        nav {
            transition: height 0.25s ease-in-out, transform 0.25s ease-in-out;
            view-transition-name: nav;
        }
    }
</style>
