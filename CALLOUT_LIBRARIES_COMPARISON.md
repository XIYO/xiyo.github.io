# 콜아웃 라이브러리 비교 및 추천

## 현재 사용 중인 라이브러리

- **@r4ai/remark-callout**: 현재 사용 중
- 기본적인 콜아웃 기능 제공
- 디자인 커스터마이징이 제한적

## 추천 대안: rehype-callouts

### 주요 장점

1. **3가지 테마 지원**
   - GitHub 스타일 (깔끔하고 전문적)
   - Obsidian 스타일 (화려하고 구분이 명확)
   - VitePress 스타일 (미니멀하고 세련됨)

2. **더 나은 기능**
   - 접기/펼치기 기능 지원
   - 중첩 콜아웃 지원
   - 다크모드 자동 대응
   - 아이콘 커스터마이징 가능

### 테마별 특징

#### GitHub 테마

```css
/* 부드러운 색상, 깔끔한 디자인 */
- NOTE: 파란색 계열
- TIP: 초록색 계열
- IMPORTANT: 보라색 계열
- WARNING: 노란색 계열
- CAUTION: 빨간색 계열
```

#### Obsidian 테마

```css
/* 선명한 색상, 뚜렷한 구분 */
- info: 밝은 파란색
- tip: 밝은 초록색
- warning: 밝은 노란색
- danger: 밝은 빨간색
- note: 회색 계열
- abstract/summary/tldr: 청록색
- success/check/done: 초록색
- question/help/faq: 주황색
- failure/fail/missing: 빨간색
- danger/error: 진한 빨간색
- bug: 빨간색
- example: 보라색
- quote/cite: 회색
```

#### VitePress 테마

```css
/* 미니멀, 파스텔톤 */
- info: 연한 파란색
- tip: 연한 초록색
- warning: 연한 노란색
- danger: 연한 빨간색
- details: 연한 회색
```

### 설치 방법

```bash
# 현재 라이브러리 제거
pnpm remove @r4ai/remark-callout

# rehype-callouts 설치
pnpm add rehype-callouts
```

### 구현 예시

```javascript
// /src/lib/plugin/markdown.js
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
// import remarkCallout from '@r4ai/remark-callout'; // 제거
import remarkFigureCaption from 'remark-figure-caption';
import remarkFrontmatter from 'remark-frontmatter';
import remarkExtractFrontmatter from 'remark-extract-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';
import rehypeCallouts from 'rehype-callouts'; // 추가
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { load as yamlLoad } from 'js-yaml';

export default async function markdownAsync({ markdown }) {
	const result = await unified()
		.use(remarkParse, { allowDangerousHtml: true })
		.use(remarkFrontmatter, ['yaml'])
		.use(remarkExtractFrontmatter, { yaml: yamlLoad })
		.use(remarkGfm)
		// .use(remarkCallout) // 제거
		.use(remarkFigureCaption)
		.use(remarkStaticImagePath)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeShiki, rehypeShikiOptions)
		.use(rehypeCallouts, {
			theme: 'obsidian' // 'github', 'obsidian', 'vitepress' 중 선택
			// customTypes: {
			// 	custom: {
			// 		color: ['#e3b341', '#946800'], // [light, dark]
			// 		icon: '<svg>...</svg>'
			// 	}
			// }
		})
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(markdown);

	return {
		value: String(result.value),
		data: result.data
	};
}
```

### CSS 임포트 (테마별)

```css
/* /src/app.css에 추가 */
/* GitHub 테마 사용시 */
@import 'rehype-callouts/theme/github';

/* Obsidian 테마 사용시 */
@import 'rehype-callouts/theme/obsidian';

/* VitePress 테마 사용시 */
@import 'rehype-callouts/theme/vitepress';
```

### 사용 예시

```markdown
> [!note]
> 기본 노트 콜아웃입니다.

> [!tip] 커스텀 제목
> 팁 콜아웃에 커스텀 제목을 추가할 수 있습니다.

> [!warning]- 접을 수 있는 콜아웃
> 이 내용은 접혀있다가 클릭하면 펼쳐집니다.

> [!danger]+ 기본으로 펼쳐진 콜아웃
> 이 내용은 기본적으로 펼쳐져 있습니다.

> [!info]
>
> > [!example]
> > 중첩된 콜아웃도 가능합니다.
```

## 추천 사항

1. **Obsidian 테마** 추천
   - 가장 다양한 콜아웃 타입 지원
   - 선명하고 구분이 명확한 디자인
   - 많은 사용자에게 친숙한 스타일

2. **GitHub 테마** 대안
   - 미니멀하고 전문적인 느낌
   - 기술 문서에 적합
   - 5가지 기본 타입으로 심플

3. **커스터마이징**
   - CSS 변수로 색상 조정 가능
   - 아이콘 변경 가능
   - 새로운 콜아웃 타입 추가 가능

## 마이그레이션 체크리스트

- [ ] @r4ai/remark-callout 제거
- [ ] rehype-callouts 설치
- [ ] markdown.js 파일 수정
- [ ] 테마 선택 및 CSS 임포트
- [ ] 기존 콜아웃 문법 확인 (대부분 호환됨)
- [ ] 다크모드에서 테스트
- [ ] 빌드 및 배포 확인
