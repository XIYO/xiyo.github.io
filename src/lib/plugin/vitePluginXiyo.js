import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@shikijs/rehype';
import { visit } from 'unist-util-visit';
import { getGitLogAsync } from './gitLog.js';
import rehypeCallouts from 'rehype-callouts';
import remarkFigureCaption from './remarkFigureCaption';

// 사용자 정의 메타 문자열 값을 처리하는 함수
const metaValues = [
	{
		name: 'data-title',
		regex: /data-title="(?<value>[^"]*)"/
	}
];

const parseMetaString = (meta) => {
	const map = {};

	for (const value of metaValues) {
		const result = value.regex.exec(meta);

		if (result) {
			map[`${value.name}`] = result.groups.value;
		}
	}

	return map;
};

/**
 * @type {import('@shikijs/rehype').RehypeShikiOptions}
 */
const rehypeShikiOptions = {
	theme: 'dracula',
	parseMetaString
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

			const gitLogPromise = getGitLogAsync(id);

			const filePromise = unified()
				// remark
				.use(remarkParse, { allowDangerousHtml: true })
				.use(remarkFigureCaption)
				.use(ExtractTitleAndPathRemove)

				// rehype
				.use(remarkRehype, { allowDangerousHtml: true })
				.use(rehypeCallouts)
				.use(rehypeShiki, rehypeShikiOptions)

				// stringify
				.use(rehypeStringify, { allowDangerousHtml: true })
				.process(code)

			const [file, gitLog] = await Promise.all([filePromise, gitLogPromise]);
			file.data.gitLog = gitLog

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
