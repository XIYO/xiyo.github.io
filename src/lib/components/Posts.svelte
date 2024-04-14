<script>
    const {category} = $props();
</script>

<div style="--view-transition-name: header;" class="border invert padding margin">
    <h1>{category.name}</h1>
    <ul id="tags">
        {#each category.parentCategories as category}
            <li style="--view-transition-name: tags-{category.name};" class="border accent">
                <a href={category.absolutePath}>{category.name}</a>
            </li>
        {/each}
    </ul>
</div>
<div style="--view-transition-name: content" class="border content padding margin">
    <h2 style="--view-transition-name: sub-category">SUB CATEGORY</h2>
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

    <h2 style="--view-transition-name: sub-posts">SUB POSTS</h2>

    {#if !category.allPosts.length}
        <div>글이 없습니다.</div>
    {:else}
        <ul>
            {#each category.allPosts as post}
                <li style="--view-transition-name: {post.title.replaceAll(' ', '-')}">
                    <article>
                        <a href={post.absolutePath}>{post.title}</a>
                    </article>
                </li>
            {/each}
        </ul>
    {/if}
</div>