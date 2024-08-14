import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@shikijs/rehype';
import callouts from 'remark-callouts';
import { visit } from 'unist-util-visit';
import rehypteMermaid from 'rehype-mermaid';
import unifiedGitLog from 'unified-git-log';

/**
 * @type {import('rehype-mermaid').RehypeMermaidOptions}
 * mermaidConfig https://mermaid.js.org/config/theming.html
 */
const rehypeMermaidOptions = {
	mermaidConfig: {
		theme: 'dark', fontFamily: 'inherit'
	}
};

/**
 * @type {import('@shikijs/rehype').RehypeShikiOptions}
 */
const rehypeShikiOptions = {
	theme: 'dracula'
};

export default function() {
	return {
		name: 'vite-plugin-xiyo', enforce: 'pre',

		async transform(code, id) {
			// .md 파일인 경우에만 처리
			if (!id.endsWith('.md')) {
				return;
			}

			const result = await unified()
				.use(unifiedGitLog, { filePath: id })
				.use(remarkParse)
				.use(remarkGfm)
				.use(callouts)
				.use(remarkRehype)
				.use(rehypteMermaid, rehypeMermaidOptions)
				.use(rehypeShiki, rehypeShikiOptions)
				.use(extract)
				.use(rehypeStringify)
				.process(code);

			return {
				code: `export default ${JSON.stringify(result)};`, map: null
			};
		}
	};
}

function extract() {
	return (tree, file) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName === 'h1' && node.children && node.children.length > 0) {
				file.data.title = node.children[0].value || '';
				parent.children.splice(index, 1);
			}

			// 이미지 태그의 src 속성에서 /static을 제거
			if (node.tagName === 'img' && node.properties && node.properties.src) {
				node.properties.src = node.properties.src.replace(/^\/static/, '');
			}
		});
	}
}
