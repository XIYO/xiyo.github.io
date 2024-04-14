<script>
    const {post} = $props();
</script>

<div style="--view-transition-name: header;"  class="border invert padding margin">
    <h1>{post.title}</h1>
    <ul id="tags">
        {#each post.parentCategories as category}
            <li style="--view-transition-name: tags-{category.name};" class="border accent">
                <a href={category.absolutePath}>{category.name}</a>
            </li>
        {/each}
    </ul>
</div>


<div style="--view-transition-name: content" class="border content padding margin">
    {@html post.convertedMarkdown}
</div>