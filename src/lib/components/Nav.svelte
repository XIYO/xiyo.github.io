<script>
	import AboutLink from '$lib/components/aside/AboutLink.svelte';
	import { page } from '$app/stores';
	import CategoryManager from "$lib/CategoryManager.js";

	const category = CategoryManager.instance.category.children.get('posts');
</script>

<input hidden id="nav-toggle" type="checkbox">
<nav>
	<div>
		<label aria-label="Close navigation" for="nav-toggle"></label>
	</div>
	<ul>
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<a data-sveltekit-keepfocus href="/">HOME</a>
		</li>
		<li aria-current={$page.url.pathname === category.getPathname() ? 'page' : undefined}>
			<a data-sveltekit-keepfocus href={category.getPathname()}>POSTS</a>
		</li>
		<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
			<a data-sveltekit-keepfocus href="/about">ABOUT</a>
		</li>
	</ul>
	<AboutLink />
</nav>

<style>
    div {
        background-color: inherit;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
    }

    label {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: calc(var(--quarter-ratio) * 100%);
        filter: drop-shadow(0 0 0.25rem var(--accent-color));
    }

    label::before {
        content: '🐣';
        font-size: 1.75rem;
        line-height: 3rem;
    }

    nav {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: fixed;
        inset-block-start: 0;
        inset-block-end: 0;
        inset-inline-end: 0;
        background-color: var(--light-accent-color);
        width: var(--nav-width);

				font-size: 1.25em;

        border-left-width: 1px;
        border-left-style: solid;
        border-left-color: var(--accent-color);

        overflow-wrap: break-word;
        user-select: none;

        view-transition-name: nav;
    }

    ul {
        list-style: main-category;
        overflow-y: auto;
    }

    li:not(:first-child):not(:last-child) {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }

    li[aria-current="page"] > * {
        color: var(--accent-color);
    }

    li > a:first-child {
        text-decoration: none;
    }

    @counter-style main-category {
        system: fixed;
        symbols: ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ ⛎;
        /*symbols: 🚀 ☄️ 🌌 👽 👾 🤖 🎃 🦇 🕷️ 🕸️ 🦠;*/
        suffix: " ";
    }

    @counter-style middle-category {
        system: cyclic;
        symbols: 🐭 🐮 🐯 🐰 🐲 🐍 🐴 🐏 🐵 🐔 🐶 🐷;
        suffix: " ";
    }

    @media (max-width: 424px) {
        nav {
            transform: translateX(100%);
        }

        nav > div {
            transform: translateX(calc(var(--quarter-ratio) * -100%));
        }
    }

    @media (min-width: 425px) and (max-width: 1023px) {
        nav {
            transform: translateX(calc(var(--three-quarter-ratio) * 100%));
        }
    }

    @media (max-width: 1023px) {
        nav:hover, input:checked ~ nav, nav:focus-within {
            transform: unset;
        }

        label {
            cursor: pointer;
        }

        label::before {
            content: '🥚';
        }

        input:checked ~ nav label::before {
            content: '🍳';
        }

        nav:focus-within label::before {
            content: '🐔';
        }

        input:checked ~ nav:focus-within label::before {
            content: '🐥';
        }
    }

    /* 동작 활성화 모드일때만 트랜지션을 작동, 사용자를 존중 */
    @media (prefers-reduced-motion: no-preference) {
        /* 내비게이션 반응형 영역 트랜지션 */
        nav {
            transition: transform 0.25s ease-in-out;
        }

        /* 내비게이션 노출 아이콘 반응형 영역 트랜지션 */
        nav div {
            transition: transform 0.25s ease-in-out;
        }
    }
</style>
