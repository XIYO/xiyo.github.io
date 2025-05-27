<footer class="text-xs text-center my-[var(--default-margin)]">
	<div class="mb-[var(--default-margin)]">
		Made By
		<a href="https://svelte.dev" target="_blank" class="inline-flex items-center gap-1">
			Svelte Rune
			<img src="/svelte-logo.svg" alt="Svelte Logo" class="w-4 h-4 ml-1" />
		</a>, Designed By
		<span tabindex="-1" class="inline-block text-center align-middle focus:outline-none cursor-pointer group">
			{#each 'chimi' as letter, i (i)}
				<span class="inline-block animate-bounce  [animation-delay:var(--delay)]"
				style:--delay="{i * 0.1}s"
				>{letter}</span>
			{/each}
			<span class="ml-1 inline-block">
				<span class="group-focus:hidden">🎈</span>
				<span class="hidden group-focus:inline">💥</span>
			</span>
		</span>
	</div>
</footer>
