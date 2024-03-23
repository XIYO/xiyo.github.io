<script>
	import fm from 'front-matter';
	import {marked} from 'marked';
	import hljs from 'highlight.js';

	const {markdown} = $props();

	const meta = {};
	let firstParagraphAdded = false; // 첫 번째 단락 추적을 위한 변수

	function preprocess(markdown) {
		const { attributes, body } = fm(markdown);
		for (const prop in attributes) {
			meta[prop] = attributes[prop];
		}
		return body;
	}

	const renderer = {
		heading(text, level) {
			if (level === 1)
				meta.title = text;

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
				const highlighted = hljs.highlight(code, { language, ignoreIllegals: true }).value;
				return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
			}
			}
	};

	marked.use({ gfm: true, renderer, hooks: { preprocess } });
	const html = marked.parse(markdown);
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/monokai.min.css">
	<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
</svelte:head>

{@html html}
