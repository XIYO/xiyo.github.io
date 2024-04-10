<script>
    const {category} = $props();
</script>

<div class="border invert padding margin">
    <h1>{category.name}</h1>
    <ul id="tags">
        {#each category.parentCategories as category}
            <li class="border accent">
                <a href={category.absolutePath}>{category.name}</a>
            </li>
        {/each}
    </ul>
</div>
<div class="border content padding margin">
    <h2>SUB CATEGORY</h2>
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

    <h2>SUB POSTS</h2>

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