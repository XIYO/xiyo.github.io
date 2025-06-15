import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkCallout from '@r4ai/remark-callout';
import remarkFigureCaption from 'remark-figure-caption';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import matter from 'gray-matter';

/**
 * 마크다운을 HTML로 변환하고 메타데이터를 추출합니다.
 * gray-matter로 프론트매터를 먼저 파싱하고, unified 파이프라인으로 마크다운을 HTML로 변환합니다.
 *
 * @param {{ markdown: string }} options
 * @returns {Promise<{ value: string, data: Record<string, any> }>}
 */
export default async function markdownAsync({ markdown }) {
	// 1. gray-matter로 프론트매터와 콘텐츠 분리
	const { data, content } = matter(markdown);

	// 2. 콘텐츠만 unified 파이프라인으로 처리
	const result = await unified()
		// remark 단계: 마크다운 파싱
		.use(remarkParse, { allowDangerousHtml: true })
		.use(remarkGfm) // GitHub Flavored Markdown 지원 (테이블, 취소선, 작업 목록 등)
		.use(remarkCallout) // Obsidian 스타일 콜아웃 지원
		.use(remarkFigureCaption)

		// rehype 단계: HTML 변환 및 처리
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeShiki, rehypeShikiOptions)

		// stringify 단계: 최종 HTML 생성
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(content);

	return {
		value: String(result.value),
		data // gray-matter에서 파싱된 프론트매터 데이터
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
