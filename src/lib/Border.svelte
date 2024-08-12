<script>
	/** @type {{ children: import('svelte').Snippet, viewTransitionName: string, beforeViewTransitionClass?: string, afterViewTransitionClass?: string, padding?: boolean, content?: boolean, negative?: boolean, id?: string, tag?: string, rest?: any }} */
	const {
		viewTransitionName,
		beforeViewTransitionClass = 'before-view-transition',
		afterViewTransitionClass = 'after-view-transition',
		padding = false,
		content = false,
		negative = false,
		children,
		id,
		tag = 'div',
		...rest
	} = $props();
</script>

<div
	id={id ? `border-outer-${id}` : undefined}
	class="border-outer"
	style:view-transition-name={`border-outer-${viewTransitionName}`}
style:view-transition-class={beforeViewTransitionClass}
	{...rest}
>
	<svelte:element
		this={tag}
		id="border-inner-{id}"
		class:padding
		class:content
		class:negative
		style:view-transition-name={`border-inner-${viewTransitionName}`}
		style:view-transition-class={afterViewTransitionClass}
	>
		{@render children()}
	</svelte:element>
</div>

<style>
	.border-outer {
		background-color: var(--color-default-black);
		border-radius: var(--outer-border-radius);

		margin-block: var(--default-margin-block);
		padding: var(--default-border-width);
		box-sizing: border-box;

		:global(&:has(:not(.content))) {
			color: var(--color-default-white);
		}

		/* border-inner 를 명시하는 기능, 반드시 하나의 차일드만 존재 해야함 */
		:global(& > :only-child) {
			border-radius: var(--inner-border-radius);
			block-size: 100%; /* 이너는 부모 영역을 꽉 채운다 */

			overflow: hidden;
		}

		:global(.highlight-background) {
			background-color: var(--color-primary);
		}

		:global(.padding) {
			padding: var(--default-padding);
		}

		:global(.negative) {
			color: var(--color-default-black);
			background-color: var(--color-default-white);
		}

		:global(.content) {
			:global(& > :first-child) {
				margin-block-start: 0;
			}

			:global(& > :last-child) {
				margin-block-end: 0;
			}
		}

		:global(& > *:not(:only-child)) {
			/* 디버깅 기능, 나와서는 안되는 여역이라 색상을 엉뚱하게 표시 */
			background-color: red;
		}
	}
</style>
