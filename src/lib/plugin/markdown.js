import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkCallout from '@r4ai/remark-callout';
import remarkFigureCaption from 'remark-figure-caption';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkExtractFrontmatter from 'remark-extract-frontmatter';
import { load as yamlLoad } from 'js-yaml';

/**
 * 마크다운을 HTML로 변환하고 메타데이터를 추출합니다.
 * unified 파이프라인을 통해 단일 처리 과정으로 마크다운을 파싱하고 HTML로 변환합니다.
 *
 * file.data의 목적:
 * - unified 파이프라인에서 플러그인 간 메타데이터 공유
 * - 프론트매터에서 추출된 데이터 저장 (제목, 설명, 태그 등)
 * - 커스텀 플러그인에서 추출한 정보 저장 (예: 자동 추출된 제목)
 *
 * @param {{ markdown: string }} options
 * @returns {Promise<{ value: string, data: Record<string, any> }>}
 */
export default async function markdownAsync({ markdown }) {
	const result = await unified()
		// remark 단계: 마크다운 파싱 및 메타데이터 처리
		.use(remarkParse, { allowDangerousHtml: true })
		.use(remarkGfm) // GitHub Flavored Markdown 지원 (테이블, 취소선, 작업 목록 등)
		.use(remarkCallout) // Obsidian 스타일 콜아웃 지원
		.use(remarkFigureCaption)
		.use(remarkFrontmatter, ['yaml', 'toml']) // frontmatter 블록 인식
		.use(remarkExtractFrontmatter, { yaml: yamlLoad }) // frontmatter를 file.data로 추출
		// .use(extractTitleAndDescription) // 제목과 설명 자동 추출

		// rehype 단계: HTML 변환 및 처리
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeShiki, rehypeShikiOptions)
		// .use(processImages) // 이미지 처리

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
