import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
// import remarkCallout from '@r4ai/remark-callout';
import remarkFigureCaption from 'remark-figure-caption';
import remarkFrontmatter from 'remark-frontmatter';
import remarkExtractFrontmatter from 'remark-extract-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';
import rehypeCallouts from 'rehype-callouts';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { load as yamlLoad } from 'js-yaml';

// 성능 최적화: unified 프로세서 캐싱
/** @type {import('unified').Processor | null} */
let cachedProcessor = null;

/**
 * @typedef {import('../types/markdown.js').MdastNode} MdastNode
 * @typedef {import('../types/markdown.js').MdastImage} MdastImage
 * @typedef {import('../types/markdown.js').UnifiedPlugin} UnifiedPlugin
 */

/**
 * 이미지 경로에서 /static을 제거하는 remark 플러그인
 * 마크다운에서는 /static/image.png로 작성하지만, 빌드 시 /image.png로 변환됩니다.
 * @returns {UnifiedPlugin}
 */
function remarkStaticImagePath() {
	return (/** @type {MdastNode} */ tree) => {
		visit(tree, 'image', (/** @type {MdastImage} */ node) => {
			if (node.url && node.url.startsWith('/static/')) {
				node.url = node.url.replace('/static/', '/');
			}
		});
	};
}

/**
 * unified 프로세서를 캐시하여 반환합니다.
 * @returns {import('unified').Processor}
 */
function getProcessor() {
	if (!cachedProcessor) {
		cachedProcessor = unified()
			// remark 단계: 마크다운 파싱
			.use(remarkParse, { allowDangerousHtml: true })
			.use(remarkFrontmatter, ['yaml']) // YAML frontmatter 파싱
			.use(remarkExtractFrontmatter, { yaml: yamlLoad }) // yamlLoad 함수를 직접 로더로 전달
			.use(remarkGfm) // GitHub Flavored Markdown 지원 (테이블, 취소선, 작업 목록 등)
			// .use(remarkCallout) // Obsidian 스타일 콜아웃 지원
			.use(remarkFigureCaption)
			.use(remarkStaticImagePath) // 이미지 경로에서 /static 제거

			// rehype 단계: HTML 변환 및 처리
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeShiki, rehypeShikiOptions)
			.use(rehypeCallouts, {
				theme: 'obsidian' // Obsidian 테마 사용
			})

			// stringify 단계: 최종 HTML 생성
			.use(rehypeStringify, { allowDangerousHtml: true });
	}
	return cachedProcessor;
}

/**
 * 마크다운을 HTML로 변환하고 메타데이터를 추출합니다.
 * remark-frontmatter와 remark-extract-frontmatter로 프론트매터를 파싱하고,
 * unified 파이프라인으로 마크다운을 HTML로 변환합니다.
 * 
 * 성능 최적화: 프로세서 캐싱으로 초기화 비용 감소
 *
 * @param {{ markdown: string }} options
 * @returns {Promise<import('../types/markdown.js').ProcessedMarkdown>}
 */
export default async function markdownAsync({ markdown }) {
	// 캐시된 프로세서 사용
	const processor = getProcessor();
	const result = await processor.process(markdown);

	return {
		value: String(result.value),
		data: result.data
	};
}

/**
 * @type {import('@shikijs/rehype').RehypeShikiOptions}
 * 성능 최적화: Shiki 옵션 객체 재사용
 */
const rehypeShikiOptions = {
	themes: {
		light: 'dracula',
		dark: 'dracula'
	},
	// 성능 향상을 위한 추가 옵션
	defaultColor: false // CSS 변수 사용으로 번들 크기 감소
};

/**
 * 캐시된 프로세서를 정리합니다. (테스트나 메모리 정리용)
 */
export function clearProcessorCache() {
	cachedProcessor = null;
}
