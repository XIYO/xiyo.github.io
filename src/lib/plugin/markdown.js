import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFigureCaption from 'remark-figure-caption';
import remarkRehype from 'remark-rehype';
import rehypeCallouts from 'rehype-callouts';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { getGitLogAsync } from '$lib/plugin/gitLog.js';

export default async function markdownAsync({markdown, path}) {
	const gitLogPromise = getGitLogAsync(path);

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
		.process(markdown);

	const [gitLog, file] = await Promise.all([gitLogPromise, filePromise]);
	file.data.gitLog = gitLog;

	return file;
}

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
		theme: 'solarized-light',
	parseMetaString
};

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
