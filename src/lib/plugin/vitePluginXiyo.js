import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkCalloutDirectives from '@microflash/remark-callout-directives';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@shikijs/rehype';
import { visit } from 'unist-util-visit';
import rehypteMermaid from 'rehype-mermaid';
import gitLog from './gitLog.js';

/**
 * @type {import('rehype-mermaid').RehypeMermaidOptions}
 * mermaidConfig https://mermaid.js.org/config/theming.html
 */
const rehypeMermaidOptions = {
	mermaidConfig: {
		theme: 'dark',
		fontFamily: 'inherit'
	}
};

/**
 * @type {import('@shikijs/rehype').RehypeShikiOptions}
 */
const rehypeShikiOptions = {
	theme: 'dracula'
};

export default function () {
	return {
		name: 'vite-plugin-xiyo',
		enforce: 'pre',

		async transform(code, id) {
			// .md 파일인 경우에만 처리
			if (!id.endsWith('.md')) {
				return;
			}

			const result = await unified()
				.use(gitLog, { filePath: id })
				.use(ExtractTitleAndPathRemove)
				.use(remarkParse)
				.use(remarkDirective)
				.use(remarkCalloutDirectives)
				.use(remarkRehype, { allowDangerousHtml: true })
				.use(rehypteMermaid, rehypeMermaidOptions)
				.use(rehypeShiki, rehypeShikiOptions)
				.use(rehypeStringify, { allowDangerousHtml: true })
				.process(code);

			return {
				code: `export default ${JSON.stringify(result)};`,
				map: null
			};
		}
	};
}

function ExtractTitleAndPathRemove() {
	return (tree, file) => {
		visit(tree, (node, index, parent) => {
			if (node.type === 'heading' && node.depth === 1) {
				file.data.title = node.children[0].value || '';
				parent.children.splice(index, 1);
			}

			if (node.type === 'image' && node.url.startsWith('/static')) {
				node.url = node.url.replace('/static', '');
			}
		});
	};
}
