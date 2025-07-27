<footer class="preset-filled-surface-200-700 text-xs text-center py-2">
	<div>
		Made By
		<a href="https://svelte.dev" target="_blank" class="inline-flex items-center gap-1">
			Svelte Rune
			<img src="/svelte-logo.svg" alt="Svelte Logo" class="w-4 h-4 ml-1" />
		</a>, Designed By
		<span
			tabindex="-1"
			class="inline-block text-center align-middle focus:outline-none cursor-pointer group"
		>
			{#each 'chimi' as letter, i (i)}
				<span class="inline-block animate-bounce" style:--delay="{i * 0.1}s">{letter}</span>
			{/each}
			<span class="ml-1 inline-block">
				<span class="group-focus:hidden">🎈</span>
				<span class="hidden group-focus:inline">💥</span>
			</span>
		</span>
	</div>
</footer>
