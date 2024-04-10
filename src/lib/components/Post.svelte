<script>
    const {post} = $props();
</script>

<div class="border invert padding margin">
    <h1>{post.title}</h1>
    <ul id="tags">
        {#each post.parentCategories as category}
            <li class="border accent">
                <a href={category.absolutePath}>{category.name}</a>
            </li>
        {/each}
    </ul>
</div>


<div class="border content padding margin">
    {@html post.convertedMarkdown}
</div>