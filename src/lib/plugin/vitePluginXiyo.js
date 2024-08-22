import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@shikijs/rehype';
import { visit } from 'unist-util-visit';
import gitLog from './gitLog.js';
import rehypeCallouts from 'rehype-callouts';

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

			const file = await unified()
				.use(gitLog, { filePath: id })
				.use(ExtractTitleAndPathRemove)

				// remark
				.use(remarkParse, { allowDangerousHtml: true })
				// .use(remarkDirective)
				// .use(remarkCalloutDirectives)

				// rehype
				.use(remarkRehype, { allowDangerousHtml: true })
				.use(rehypeCallouts)
				.use(rehypeShiki, rehypeShikiOptions)
				.use(rehypeStringify, { allowDangerousHtml: true })
				.process(code);

			return {
				code: `export default ${JSON.stringify(file)};`,
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
