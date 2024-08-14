import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@shikijs/rehype';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import callouts from 'remark-callouts';
import { execSync } from 'child_process';
import { visit } from 'unist-util-visit';
import rehypteMermaid from 'rehype-mermaid';

/**
 * @type {import('rehype-mermaid').RehypeMermaidOptions}
 * mermaidConfig https://mermaid.js.org/config/theming.html
 */
const rehypeMermaidOptions = {
	mermaidConfig: {
		theme: 'dark',
		fontFamily: 'inherit',
	}
}

export default function () {
	return {
		name: 'vite-plugin-xiyo',
		enforce: 'pre',

		async transform(code, id) {
			if (id.endsWith('.md')) {
				// .md 파일인 경우에만 처리
				// Git 로그 정보를 추출하여 프론트매터에 추가
				const gitHistory = getGitHistory(id);

				let frontmatter = {};
				// 마크다운을 HTML로 변환합니다. title 은 여기서 추출합니다.
				let processor = unified()
					.use(remarkParse)
					.use(remarkFrontmatter)
					.use(remarkParseFrontmatter)
					.use(remarkGfm)
					.use(callouts)
					.use(remarkRehype)
					.use(rehypteMermaid, rehypeMermaidOptions)
					.use(rehypeShiki, {
						theme: 'dracula'
					})
					.use(() => {
						return (tree) => {
							visit(tree, 'element', (node, index, parent) => {
								if (node.tagName === 'h1' && node.children && node.children.length > 0) {
									frontmatter.title = node.children[0].value || '';
									parent.children.splice(index, 2);
								}

								// 이미지 태그의 src 속성에서 /static을 제거
								if (node.tagName === 'img' && node.properties && node.properties.src) {
									node.properties.src = node.properties.src.replace(/^\/static/, '');
								}
							});
						};
					})
					.use(rehypeStringify);

				const result = await processor.process(code);

				// 기존 프론트매터에 Git 정보를 추가
				frontmatter = {
					...frontmatter,
					...result.data.frontmatter,
					firstCommitDate: gitHistory[gitHistory.length - 1].date, // 가장 오래된 커밋
					lastCommitDate: gitHistory[0].date // 가장 최근 커밋
				};

				const markdown = {
					frontmatter,
					content: result.value
				};

				return {
					code: `export default ${JSON.stringify(markdown)};`,
					map: null
				};
			}
		}
	};
}

// Git 로그 정보를 추출하는 함수
function getGitHistory(filePath) {
	try {
		const output = execSync(
			`git log --follow --pretty=format:"%ad, %s" --date=format:"%Y-%m-%dT%H:%M%z" "${filePath}"`
		)
			.toString()
			.trim();

		return output.split('\n').map((line) => {
			const [date, subject] = line.split(', ');
			return { date, subject };
		});
	} catch (error) {
		console.error(`Error fetching git history for ${filePath}:`, error);
		return { firstCommitDate: null, lastCommitDate: null, history: [] };
	}
}
