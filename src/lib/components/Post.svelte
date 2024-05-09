<script>
    import Header from "$lib/Header.svelte";
    const {post} = $props();
</script>

<Header>
    <h1>{post.title}</h1>
</Header>

<div
        class="border-outer"
        style="--view-transition-name: border-outer-content;"
>
    <div
            class="content padding"
            style="--view-transition-name: border-inner-content;"
    >
        {@html post.convertedMarkdown}
    </div>
</div>