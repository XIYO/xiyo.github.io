<script>
	/** @type {{
	 * children: import('svelte').Snippet,
	 * negative?: boolean,
	 * tag?: string,
	 * rest?: any
	 * class?: string
	 * }}
	 **/
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
