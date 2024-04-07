<script>
    const {category} = $props();
    import {page} from "$app/stores";

    // const tags = () => {
    // 	const paths = $page.url.pathname.split('/').slice(1, -1);
    // 	// 패스를 하나하나 /태그, /태그1/태그2 /태그1/태그2/태그3 이런식으로 나눠서 태그로 만들기
    // 	// 그리고 path, name 형식으로 출력
    // 	return paths.map((path, index) => {
    // 		return {
    // 			path: paths.slice(0, index + 1).join('/'),
    // 			name: path
    // 		};
    // 	});
    // }
    //
    // const tags = tags();
</script>

<div class="border invert padding margin">
    <h1>{category.name}</h1>
</div>
<div class="border content padding margin">
    <h2>SUB CATEGORY</h2>
    {#if !category.children.size}
        <div>하위 카테고리가 없습니다.</div>
    {/if}
    {#if category.children.size}
        <ul>
            {#each category.children.values() as category}
                <li>
                    <a href={category.getPathname()}>{category.name}</a>
                </li>
            {/each}
        </ul>
    {/if}

    <h2>SUB POSTS</h2>

    {#if !category.allPosts.size}
        <div>글이 없습니다.</div>
    {:else}
        <ul>
            {#each category.allPosts.keys() as key}
                <li>
                    <article>
                        <a href={`${category.getPathname()}/${key}`}>{key}</a>
                    </article>
                </li>
            {/each}
        </ul>
    {/if}
</div>