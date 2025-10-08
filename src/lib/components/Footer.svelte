<footer class="border-t border-surface-200-800 px-4 py-4 text-xs uppercase tracking-widest">
	<div class="flex flex-wrap items-center justify-center gap-2">
		<span>Made By</span>
		<a href="https://svelte.dev" target="_blank" class="inline-flex items-center gap-1">
			Svelte Rune
			<img src="/svelte-logo.svg" alt="Svelte Logo" class="h-4 w-4" />
		</a>
		<span>Designed By</span>
		<button
			type="button"
			tabindex="-1"
			class="inline-flex items-center gap-1 focus:outline-none group cursor-pointer"
		>
			{#each 'chimi' as letter, i (i)}
				<span class="inline-block animate-bounce" style:--delay="{i * 0.1}s">{letter}</span>
			{/each}
			<span>
				<span class="group-focus:hidden">🎈</span>
				<span class="hidden group-focus:inline">💥</span>
			</span>
		</button>
	</div>
</footer>
