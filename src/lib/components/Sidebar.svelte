<script>
	import Home from '@lucide/svelte/icons/home';
	import FileText from '@lucide/svelte/icons/file-text';
	import Info from '@lucide/svelte/icons/info';
	import Globe from '@lucide/svelte/icons/globe';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { deLocalizeHref } from '$lib/paraglide/runtime.js';
	import { localizeHref, locales, setLocale } from '$lib/paraglide/runtime.js';

	/** @type {HTMLElement | null} */
	let sidebarElement = $state(null);

	afterNavigate(() => {
		sidebarElement?.hidePopover();
	});

	const menuItems = [
		{ label: 'Home', icon: Home, path: '/' },
		{ label: 'Posts', icon: FileText, path: '/posts' },
		{ label: 'About', icon: Info, path: '/about' },
		{ label: 'Globe', icon: Globe, path: '/globe' }
	];

	const localeEmojis = {
		'ko-kr': '🇰🇷',
		'en-us': '🇺🇸',
		'ja-jp': '🇯🇵'
	};

	/**
	 * @param {Event} event
	 * @param {string} locale
	 */
	async function handleLocaleClick(event, locale) {
		event.preventDefault();
		setLocale(/** @type {import('$lib/paraglide/runtime.js').Locale} */ (locale));
	}

	/**
	 * Hover-driven popover open keeps non-JS behaviour (click only) intact.
	 * PointerType guard prevents accidental triggering on touch devices.
	 *
	 * @param {PointerEvent} event
	 */
	const handleHoverOpen = (event) => {
		if (event.pointerType !== 'mouse') return;
		if (!sidebarElement?.showPopover) return;
		sidebarElement.showPopover();
	};

	/**
	 * @param {PointerEvent} event
	 */
	const handleHoverClose = (event) => {
		if (event.pointerType !== 'mouse') return;
		if (!sidebarElement?.hidePopover) return;
		if (!sidebarElement.hasAttribute('open')) return;
		sidebarElement.hidePopover();
	};
</script>

{#snippet sidebarItem(
	/** @type {import('svelte').ComponentType | string | null | undefined} */ icon,
	/** @type {string} */ label,
	/** @type {string} */ href,
	/** @type {boolean} */ isActive = false,
	/** @type {(event: MouseEvent) => void} */ onClick = () => {}
)}
	<a
		href={href}
		class={`flex h-12 w-full text-sm uppercase tracking-widest transition ${isActive ? 'preset-filled-surface-200-800 font-bold' : 'hover:preset-filled-surface-400-600'}`}
		aria-label={label}
		title={label}
		onclick={onClick}
	>
		<div class="w-12 grid place-items-center-safe">
			{#if typeof icon === 'string'}
				<span aria-hidden="true" class="text-lg leading-none">{@html icon}</span>
			{:else if icon}
				<svelte:component this={icon} size={12} />
			{:else}
				<span aria-hidden="true" class="text-lg leading-none">•</span>
			{/if}
		</div>
		<span class="flex-1 content-center-safe">{label}</span>
	</a>
{/snippet}

<aside bind:this={sidebarElement} class="group fixed sm:left-0 sm:top-0 w-full sm:w-12 sm:open:w-64 h-screen
             transition-discrete
             starting:open:opacity-0
             transition-opacity
             sm:[transition-property:width]
             duration-300
             ease-out
             border-r border-surface-200-800
             sm:flex flex-col bg-surface-50-950/70 backdrop-blur"
       id="sidebar"
       popover
       onpointerleave={handleHoverClose}
       onpointerenter={handleHoverOpen}
>
    <div class="flex flex-col w-full h-full sm:w-64 overflow-x-hidden divide-y divide-surface-200-800">
        <!-- 헤더: 로고 -->
        <header class="flex w-full h-12">
            <button aria-label="SvelteHole 홈"
                    class="flex h-12 w-full hover:preset-filled-surface-400-600"
                    popovertarget="sidebar"
                    title="SvelteHole 홈">
                <span class="w-12 h-full grid place-items-center-safe">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu ">
                        <path d="M4 5h16" class="transition-all duration-300 origin-[12px_5px] group-open:translate-y-[7px] group-open:rotate-45"/>
                        <path d="M4 12h16" class="transition-opacity duration-300 group-open:opacity-0"/>
                        <path d="M4 19h16" class="transition-all duration-300 origin-[12px_19px] group-open:-translate-y-[7px] group-open:-rotate-45"/>
                    </svg>
                </span>
                <span class="flex-1 h-full text-left content-center-safe px-2 text-sm">Menu</span>
            </button>
        </header>

        <!-- 바디: 메인 내비게이션 (스크롤 가능) -->
        <nav class="flex-1 flex flex-col w-full overflow-y-auto">
            {#each menuItems as item}
                {@const currentPath = deLocalizeHref(page.url.pathname)}
                {@const isActive = item.path === '/' ? currentPath === '/' : currentPath.startsWith(item.path)}
                {@render sidebarItem(item.icon, item.label, localizeHref(item.path), isActive)}
            {/each}
        </nav>
        <!-- 푸터: 언어 선택 -->
        <footer class="w-full border-t border-surface-200-800 bg-surface-50-950/70 backdrop-blur">
            {#each locales as locale (locale)}
                {@render sidebarItem(
                    localeEmojis[locale] ?? '🌐',
                    locale,
                    localizeHref(page.url.pathname, { locale }),
                    false,
                    (event) => handleLocaleClick(event, locale)
                )}
            {/each}
        </footer>
    </div>
</aside>

<button aria-label="SvelteHole 홈"
        class="fixed sm:hidden left-0 top-0 w-12 h-12 grid place-items-center-safe"
        popovertarget="sidebar"
        title="SvelteHole 홈">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu">
        <path d="M4 5h16"/>
        <path d="M4 12h16"/>
        <path d="M4 19h16"/>
    </svg>
</button>

<style>
    @reference "../../app.css";

    :global(body) {
        @apply sm:ml-12;
    }

    /*
     * 루트에 존재하는 헤더 제어
     * 사이드바는 모바일 퍼스트에서는 없고 버튼이 존재해야하는데 그 공간을 만들기 위한 여백
     */
    :global(#main-header) {
        @apply pl-12 sm:pl-0;
    }
</style>
