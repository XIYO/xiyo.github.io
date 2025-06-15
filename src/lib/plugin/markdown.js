import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkCallout from '@r4ai/remark-callout';
import remarkFigureCaption from 'remark-figure-caption';
import remarkFrontmatter from 'remark-frontmatter';
import remarkExtractFrontmatter from 'remark-extract-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { load as yamlLoad } from 'js-yaml';

/**
 * 이미지 경로에서 /static을 제거하는 remark 플러그인
 * 마크다운에서는 /static/image.png로 작성하지만, 빌드 시 /image.png로 변환됩니다.
 */
function remarkStaticImagePath() {
	return (/** @type {any} */ tree) => {
		visit(tree, 'image', (node) => {
			if (node.url && node.url.startsWith('/static/')) {
				node.url = node.url.replace('/static/', '/');
			}
		});
	};
}

/**
 * 마크다운을 HTML로 변환하고 메타데이터를 추출합니다.
 * remark-frontmatter와 remark-extract-frontmatter로 프론트매터를 파싱하고,
 * unified 파이프라인으로 마크다운을 HTML로 변환합니다.
 *
 * @param {{ markdown: string }} options
 * @returns {Promise<{ value: string, data: Record<string, any> }>}
 */
export default async function markdownAsync({ markdown }) {
	// unified 파이프라인으로 처리
	const result = await unified()
		// remark 단계: 마크다운 파싱
		.use(remarkParse, { allowDangerousHtml: true })
		.use(remarkFrontmatter, ['yaml']) // YAML frontmatter 파싱
		.use(remarkExtractFrontmatter, { yaml: yamlLoad }) // yamlLoad 함수를 직접 로더로 전달
		.use(remarkGfm) // GitHub Flavored Markdown 지원 (테이블, 취소선, 작업 목록 등)
		.use(remarkCallout) // Obsidian 스타일 콜아웃 지원
		.use(remarkFigureCaption)
		.use(remarkStaticImagePath) // 이미지 경로에서 /static 제거

		// rehype 단계: HTML 변환 및 처리
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeShiki, rehypeShikiOptions)

		// stringify 단계: 최종 HTML 생성
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(markdown);

	return {
		value: String(result.value),
		data: result.data
	};
}

/**
 * @type {import('@shikijs/rehype').RehypeShikiOptions}
 */
const rehypeShikiOptions = {
	themes: {
		light: 'github-light',
		dark: 'github-dark'
	}
};
