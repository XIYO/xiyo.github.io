import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFigureCaption from 'remark-figure-caption';
import remarkRehype from 'remark-rehype';
import rehypeCallouts from 'rehype-callouts';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import imageSize from 'image-size';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { transformerNotationDiff, transformerNotationFocus } from '@shikijs/transformers';
import { createCssVariablesTheme } from 'shiki/core';
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
		.use(remarkFigureCaption)
		.use(remarkFrontmatter, ['yaml', 'toml']) // frontmatter 블록 인식
		.use(remarkExtractFrontmatter, { yaml: yamlLoad }) // frontmatter를 file.data로 추출
		.use(extractTitleAndDescription) // 제목과 설명 자동 추출

		// rehype 단계: HTML 변환 및 처리
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeCallouts)
		.use(rehypeShiki, rehypeShikiOptions)
		.use(processImages) // 이미지 처리

		// stringify 단계: 최종 HTML 생성
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(markdown);

	return {
		value: String(result.value),
		data: result.data || {}
	};
}

// 사용자 정의 메타 문자열 값을 처리하는 함수
const metaValues = [
	{
		name: 'data-title',
		regex: /data-title="(?<value>[^"]*)"/
	}
];

/**
 * @param {string} meta
 * @returns {Record<string, string>}
 */
const parseMetaString = (meta) => {
	/** @type {Record<string, string>} */
	const map = {};

	for (const value of metaValues) {
		const result = value.regex.exec(meta);

		if (result && result.groups) {
			map[value.name] = result.groups.value;
		}
	}

	return map;
};

// 변수형 테마 생성
const theme = createCssVariablesTheme({
	name: 'css-variables',
	// variablePrefix: '--shiki-',
	variableDefaults: {},
	fontStyle: true
});

/**
 * @type {import('@shikijs/rehype').RehypeShikiOptions}
 */
const rehypeShikiOptions = {
	theme,
	// themes: {
	// 	light: 'solarized-light',
	// 	dark: 'poimandres'
	// },
	transformers: [transformerNotationDiff(), transformerNotationFocus()],
	parseMetaString
};

/**
 * 제목과 설명을 자동으로 추출하는 remark 플러그인
 * - 첫 번째 h1 태그에서 제목을 추출하고 해당 태그를 제거
 * - 제목 다음 첫 번째 단락에서 설명을 추출
 * - 추출된 정보를 file.data에 저장
 */
function extractTitleAndDescription() {
	/**
	 * @param {any} tree
	 * @param {any} file
	 */
	return (tree, file) => {
		visit(tree, (node, index, parent) => {
			if (node.type === 'heading' && node.depth === 1) {
				// 제목 추출
				file.data.title = node.children[0]?.value || '';

				// 제목 다음 단락에서 설명 추출
				if (
					index !== undefined &&
					parent &&
					parent.children[index + 1] &&
					parent.children[index + 1].type === 'paragraph' &&
					parent.children[index + 1].children[0] &&
					parent.children[index + 1].children[0].type === 'text'
				) {
					file.data.description = parent.children[index + 1].children[0].value;
				}

				// 제목 태그 제거 (콘텐츠에서 중복 방지)
				if (parent && index !== undefined) {
					parent.children.splice(index, 1);
				}
			}
		});
	};
}

/**
 * 이미지를 처리하는 rehype 플러그인
 * - 로컬 이미지의 크기를 자동으로 계산하여 aspect-ratio 설정
 * - /static 경로를 제거하여 배포용 경로로 변경
 */
function processImages() {
	/**
	 * @param {any} tree
	 */
	return (tree) => {
		visit(tree, (node) => {
			if (
				node.type === 'element' &&
				node.tagName === 'img' &&
				node.properties?.src?.startsWith('/static')
			) {
				const imagePath = join(process.cwd(), node.properties.src);

				let width = 768;
				let height = 432;

				try {
					// 파일을 읽어서 imageSize에 전달
					const buffer = readFileSync(imagePath);
					const size = imageSize(buffer);
					if (size && typeof size === 'object') {
						width = size.width || 768;
						height = size.height || 432;
					}
				} catch (err) {
					console.error(`Error reading image size for ${imagePath}:`, err);
				}

				// 최대 공약수를 사용하여 비율을 정수로 만듭니다.
				const gcdValue = gcd(width, height);
				const aspectWidth = width / gcdValue;
				const aspectHeight = height / gcdValue;

				// 이미지 속성 설정
				node.properties.width = width;
				node.properties.height = 'auto';
				node.properties.style = `aspect-ratio: ${aspectWidth} / ${aspectHeight};`;

				// 최종 빌드에서 보이지 않아야할 경로를 제거합니다.
				node.properties.src = node.properties.src.replace('/static', '');
			}
		});
	};
}

/**
 * 최대 공약수(GCD)를 구하는 함수
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function gcd(a, b) {
	if (!b) return a;
	return gcd(b, a % b);
}
