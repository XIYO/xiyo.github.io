<script>
	import { Marked } from 'marked';
	import fm from 'front-matter';
	import { markedHighlight } from 'marked-highlight';
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
	};

	const marked = new Marked(markedHighlight({
		langPrefix: 'hljs language-', highlight(code, lang, info) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	}))

	marked.use({ renderer, hooks: { preprocess } });
	const html = marked.parse(markdown);
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
</svelte:head>

{@html html}
