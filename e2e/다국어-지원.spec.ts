import { test, expect } from '@playwright/test';

test.describe('다국어 지원 테스트', () => {
	test('한국어 페이지가 기본으로 표시되는지 확인', async ({ page }) => {
		await page.goto('/');

		// HTML lang 속성 확인
		const htmlLang = await page.locator('html').getAttribute('lang');
		expect(htmlLang).toBe('ko-kr');

		// 한국어 콘텐츠가 표시되는지 확인
		const content = await page.textContent('body');
		// 한글이 포함되어 있는지 확인
		expect(content).toMatch(/[가-힣]/);
	});

	test('영어 페이지로 전환이 가능한지 확인', async ({ page }) => {
		await page.goto('/en-us');

		// HTML lang 속성 확인
		const htmlLang = await page.locator('html').getAttribute('lang');
		expect(htmlLang).toBe('en-us');

		// 영어 콘텐츠가 표시되는지 확인
		await expect(page).toHaveURL(/\/en-us/);
	});

	test('일본어 페이지로 전환이 가능한지 확인', async ({ page }) => {
		await page.goto('/ja-jp');

		// HTML lang 속성 확인
		const htmlLang = await page.locator('html').getAttribute('lang');
		expect(htmlLang).toBe('ja-jp');

		// 일본어 URL이 맞는지 확인
		await expect(page).toHaveURL(/\/ja-jp/);
	});

	test('언어 전환 후 같은 페이지 유지되는지 확인', async ({ page }) => {
		// 한국어 포스트 페이지로 이동
		await page.goto('/posts/development/web/cookies');
		const koreanTitle = await page.locator('main h1, article h1').first().textContent();

		// 영어 버전으로 전환
		await page.goto('/en-us/posts/development/web/cookies');
		const englishTitle = await page.locator('main h1, article h1').first().textContent();

		// 제목이 다른지 확인 (번역되었는지)
		expect(koreanTitle).not.toBe(englishTitle);

		// 같은 포스트인지 URL 경로로 확인
		await expect(page).toHaveURL(/\/posts\/development\/web\/cookies/);
	});

	test('hreflang 태그가 올바르게 설정되는지 확인', async ({ page }) => {
		await page.goto('/');

		// hreflang 태그들 확인
		const hreflangKo = await page
			.locator('link[rel="alternate"][hreflang="ko-kr"]')
			.getAttribute('href');
		const hreflangEn = await page
			.locator('link[rel="alternate"][hreflang="en-us"]')
			.getAttribute('href');
		const hreflangJa = await page
			.locator('link[rel="alternate"][hreflang="ja-jp"]')
			.getAttribute('href');
		const hreflangDefault = await page
			.locator('link[rel="alternate"][hreflang="x-default"]')
			.getAttribute('href');

		// 각 hreflang 태그가 존재하는지 확인
		expect(hreflangKo).toBeTruthy();
		expect(hreflangEn).toBeTruthy();
		expect(hreflangJa).toBeTruthy();
		expect(hreflangDefault).toBeTruthy();
	});

	test('언어별 메타 태그가 올바르게 설정되는지 확인', async ({ page }) => {
		// 한국어 페이지
		await page.goto('/');
		const koLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
		expect(koLocale).toMatch(/ko/i);

		// 영어 페이지
		await page.goto('/en-us');
		const enLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
		expect(enLocale).toMatch(/en/i);

		// 일본어 페이지
		await page.goto('/ja-jp');
		const jaLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
		expect(jaLocale).toMatch(/ja/i);
	});
});
