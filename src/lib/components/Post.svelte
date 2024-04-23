<script>
    import Border from "$lib/Border.svelte";

    const {post} = $props();
</script>

<Border
        viewTransitionName="header"
        classes="padding negative"
>
    <h1>{post.title}</h1>
<!--        <ul id="tags">-->
<!--            {#each post.parentCategories as category}-->
<!--                <li style="&#45;&#45;view-transition-name: tags-{category.name};" class="border accent">-->
<!--                    <a href={category.absolutePath}>{category.name}</a>-->
<!--                </li>-->
<!--            {/each}-->
<!--        </ul>-->
</Border>

<Border
        viewTransitionName="content"
        classes="padding content"
>
        {@html post.convertedMarkdown}
</Border>