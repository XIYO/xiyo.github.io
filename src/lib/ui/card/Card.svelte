<script>
	/**
	 * @typedef {import('../../types/components.js').CardProps & {
	 *   children: import('svelte').Snippet,
	 *   tag?: string,
	 *   class?: string,
	 *   [key: string]: unknown
	 * }} CardComponentProps
	 */

	/** @type {CardComponentProps} */
	const { children, tag = 'div', negative, class: className, ...rest } = $props();
</script>

<svelte:element
	this={tag}
	class={[
		`${negative ? 'bg-surface-inverse color-surface' : 'bg-surface text-surface-inverse'}`,
		className
	]}
	{...rest}
>
	{@render children()}
</svelte:element>
