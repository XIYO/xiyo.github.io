<script>
    import fm from 'front-matter';
    import {marked} from 'marked';
    import hljs from 'highlight.js';
    import {page} from '$app/stores';

    const {markdown} = $props();

    const meta = {};
    let firstParagraphAdded = false; // 첫 번째 단락 추적을 위한 변수

    //todo 프론트메터 데이터로 태그 만들기
    function createTag() {
        const paths = $page.url.pathname.split('/').slice(1, -1);
        // 패스를 하나하나 /태그, /태그1/태그2 /태그1/태그2/태그3 이런식으로 나눠서 태그로 만들기
        // 그리고 path, name 형식으로 출력
        return paths.map((path, index) => {
            return {
                path: paths.slice(0, index + 1).join('/'),
                name: path
            };
        });
    }

    meta.tag = createTag();

    function preprocess(markdown) {
        const {attributes, body} = fm(markdown);
        for (const prop in attributes) {
            meta[prop] = attributes[prop];
        }
        return body;
    }

    const renderer = {
        heading(text, level) {
            if (level === 1) {
                meta.title = text;
                return;
            }

            return `<h${level}>${text}</h${level}>`;
        },
        paragraph(text) {
            if (!firstParagraphAdded) {
                firstParagraphAdded = true;
                meta.description = text;
            }
            return `<p>${text}</p>`;
        },
        code(code, language) {
            if (language === 'mermaid') {
                // Mermaid 블록을 처리
                return `<pre class="mermaid">${code}</pre>`;
            } else {
                // 다른 언어의 코드 블록 처리
                const highlighted = hljs.highlight(code, {language, ignoreIllegals: true}).value;
                return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
            }
        }
    };

    marked.use({gfm: true, renderer, hooks: {preprocess}});
    const html = marked.parse(markdown);
</script>

<svelte:head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description}/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/monokai.min.css">
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
</svelte:head>

<div class="border">
    <div class="header">
        <h1>{meta.title}</h1>
        <ul>
            {#if meta.tag}
                {#each meta.tag as tag}
                    <li>
                        <a href="/{tag.path}">{tag.name}</a>
                    </li>
                {/each}
            {/if}
        </ul>
    </div>
</div>
<article>
    <div class="border">
        <div class="content">
            {@html html}
        </div>
    </div>
</article>

<style>
    ul {
        text-align: end;

        margin-block: 0;
        padding-inline-start: 0;
    }

    li {
        display: inline-block;
        background-color: var(--color-primary);
        padding-block: var(--padding-block-tag);
        padding-inline: var(--padding-inline-tag);
        margin: var(--margin-tag);
        border-radius: var(--radius-default);

        a {
            color: var(--color-default-white);

            &:hover {
                text-decoration-color: var(--color-default-black);
            }
        }
    }
</style>