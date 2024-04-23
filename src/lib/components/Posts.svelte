<script>
    import Border from "$lib/Border.svelte";

    const {category} = $props();
</script>


<Border
        viewTransitionName="header"
        classes="padding negative"
>
    <h1>{category.name}</h1>
<!--    <ul id="tags">-->
<!--        {#each category.parentCategories as category}-->
<!--            <li style="&#45;&#45;view-transition-name: tags-{category.name};" class="border accent">-->
<!--                <a href={category.absolutePath}>{category.name}</a>-->
<!--            </li>-->
<!--        {/each}-->
<!--    </ul>-->
</Border>

<Border
        viewTransitionName="content"
        classes="content padding"
>
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
                <li >
                    <article>
                        <a href={post.absolutePath}>{post.title}</a>
                    </article>
                </li>
            {/each}
        </ul>
    {/if}
</Border>