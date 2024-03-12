<script>
	import AboutLink from '$lib/components/aside/AboutLink.svelte';
	import { page } from '$app/stores';
	const { category } = $props();
	const categories = category.children;
</script>

<input checked="true" hidden id="nav-toggle" type="checkbox">
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
			<!--{#if categories.size}-->
			<!--	<ul>-->
			<!--		{#each categories.values() as category}-->
			<!--			<li aria-current={$page.url.pathname === category.getPathname() ? 'page' : undefined}>-->
			<!--				<a data-sveltekit-keepfocus href={category.getPathname()}>{category.name}</a>-->
			<!--			</li>-->
			<!--		{/each}-->
			<!--	</ul>-->
			<!--{/if}-->
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

        /*border-left-width: 0.25rem;*/
        /*border-left-style: solid;*/
        /*border-left-color: var(--accent-color);*/

        overflow-wrap: break-word;
        user-select: none;

        view-transition-name: nav;
    }

    ul {
        list-style: main-category;
        overflow-y: auto;
        padding-inline-start: calc(var(--nav-width) * var(--quarter-ratio));
    }

    ul ul {
        list-style: middle-category;
        padding-inline-start: calc(var(--nav-width) * var(--three-quarters-of-quarter-ratio));
				font-size: calc(var(--three-quarters-of-three-quarter-ratio) * 1em);
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

    li > span {
        display: inline-block;
        width: calc(100% * var(--quarter-ratio));
        text-align: center;
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
        input:checked ~ nav, nav:focus-within {
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

    @media (prefers-reduced-motion: no-preference) {
        /* 내비게이션 반응형 영역 트랜지션 */
        nav {
            transition: all 0.25s ease-in-out;
        }

        /* 내비게이션 노출 아이콘 반응형 영역 트랜지션 */
        nav div {
            transition: all 0.25s ease-in-out;
        }

        a {
            transition: all 0.25s ease-in-out;
        }

        li {
            position: relative;
        }
    }
</style>
