<script>
    import Header from "$lib/Header.svelte";
    const {category} = $props();
</script>

<Header>
    <h1>posts</h1>
</Header>

<div
        class="border-outer"
        style="view-transition-name: border-outer-content;"
>
    <div
            class="content padding"
            style="view-transition-name: border-inner-content;"
    >
        <h2>sub category</h2>
        {#if !category.hasChildCategories()}
            <div>하위 카테고리가 없습니다.</div>
        {:else}
            <ul>
                {#each category.childCategories as childCategory}
                    <li>
                        <a href={childCategory.absolutePath}>{childCategory.name}</a>
                    </li>
                {/each}
            </ul>
        {/if}

        <h2>sub posts</h2>

        {#if !category.allPosts.length}
            <div>글이 없습니다.</div>
        {:else}
            <ul>
                {#each category.allPosts as post}
                    <li>
                        <article>
                            <a href={post.absolutePath}>{post.title}</a>
                        </article>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>