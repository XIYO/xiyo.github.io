import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import gitLog from './gitLog.js';
import rehypeCallouts from 'rehype-callouts';
import highlight from 'highlight.js';

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

				// rehype
				.use(remarkRehype, { allowDangerousHtml: true })
				.use(rehypeCallouts)
				.use(rehypeHighlight)
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

/**
 * remark 플러그인: 코드 하이라이팅
 */
function rehypeHighlight() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName === 'code' && node.properties && node.properties.className) {
				const [lang] = node.properties.className || [];
				// const language = lang && lang.startsWith('language-') ? lang.slice(9) : '';
				const language = 'html';

				if (highlight.getLanguage(language)) {
					const code = node.children[0] && node.children[0].value; // 코드 내용 가져오기
					const highlightedCode = highlight.highlight(code, {language}).value;
					node.children = [{ type: 'raw', value: highlightedCode }];
					node.properties.className = [`hljs`, `language-${language}`];
				}
			}
		});
	};
}


function svelte() {
	return {
		subLanguage: 'xml', // 기본적으로 XML(HTML)로 처리
		contains: [
			// <script> 블록 처리
			{
				begin: /^(\s*)(<script(\s+context="module")?>)/gm,
				end: /^(\s*)(<\/script>)/gm,
				subLanguage: 'javascript',
				excludeBegin: true,
				excludeEnd: true,
			},
			// <style> 블록 처리
			{
				begin: /^(\s*)(<style(\s+lang="[^"]+")?>)/gm,
				end: /^(\s*)(<\/style>)/gm,
				subLanguage: 'css',
				excludeBegin: true,
				excludeEnd: true,
			}
		],
	};
}

// 사용자 정의 Svelte 언어 등록
highlight.registerLanguage('svelte', svelte);
