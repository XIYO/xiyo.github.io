<script>
	import * as m from '$lib/paraglide/messages.js';
	import {localizeHref} from '$lib/paraglide/runtime.js';

	/**
	 * @typedef {import('../types/components.js').PostsProps} PostsProps
	 */

	/** @type {PostsProps} */
	const {category} = $props();
</script>

<main>
    <section>
        <h2>categories</h2>

        {#if category.childCategories.length}
            <div class="uppercase flex flex-col gap-2 p-4">
                {#each category.childCategories as childCategory (childCategory.absolutePath)}
                    <a href={localizeHref(childCategory.absolutePath)}>
                        {childCategory.name}
                        <!-- ({childCategory.allPosts.length}) -->
                    </a>
                {/each}
            </div>
        {:else}
            {m.subCategoryEmpty()}
        {/if}
    </section>

    <section>

        <h2>posts</h2>

        <div class="flex flex-col gap-2 p-4">
            {#each category.allPosts as post (post.absolutePath)}
                <a href={localizeHref(post.absolutePath)}>{post.data.title}</a>
            {/each}
        </div>
    </section>
</main>
