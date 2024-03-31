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

<div id="title" class="border">
    <div class="header">
        <h1>{category.name.toLocaleUpperCase()}</h1>
        <!--        <ul class="tags">-->
        <!--            &lt;!&ndash;{#each category.allParents as pathname}&ndash;&gt;-->
        <!--            &lt;!&ndash;    <li class="tag">&ndash;&gt;-->
        <!--            &lt;!&ndash;        <a href="/{pathname.path}">{pathname.name}</a>&ndash;&gt;-->
        <!--            &lt;!&ndash;    </li>&ndash;&gt;-->
        <!--            &lt;!&ndash;{/each}&ndash;&gt;-->
        <!--        </ul>-->
    </div>
</div>
<div id="content" class="border">
    <div class="header">
        <h2>SUB CATEGORY</h2>
    </div>
    <div class="content">
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
    </div>

    <div class="header">
        <h2>SUB POSTS</h2>
    </div>

    <div class="content">
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
</div>

<style>
    ul {
        list-style: none;
        padding-inline-start: 0;
    }

    li {
        margin-block: var(--margin-default-block);

        :first-child {
            margin-block-start: 0;
        }

        :last-child {
            margin-block-end: 0;
        }
    }
</style>