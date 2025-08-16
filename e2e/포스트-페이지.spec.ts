import { test, expect } from '@playwright/test';

test.describe('포스트 페이지 테스트', () => {
	test('포스트 목록이 표시되는지 확인', async ({ page }) => {
		await page.goto('/');
		
		// 포스트 목록이 있는지 확인
		const posts = page.locator('article');
		await expect(posts.first()).toBeVisible();
		
		// 최소 1개 이상의 포스트가 있는지 확인
		const postCount = await posts.count();
		expect(postCount).toBeGreaterThan(0);
	});

	test('포스트 상세 페이지가 올바르게 표시되는지 확인', async ({ page }) => {
		await page.goto('/posts/development/web/cookies');
		
		// 제목이 표시되는지 확인
		const title = page.locator('h1');
		await expect(title).toBeVisible();
		const titleText = await title.textContent();
		expect(titleText).toBeTruthy();
		
		// 포스트 콘텐츠가 표시되는지 확인
		const content = page.locator('article, main');
		await expect(content.first()).toBeVisible();
		
		// 코드 블록이 있다면 올바르게 표시되는지 확인
		const codeBlocks = page.locator('pre code');
		if (await codeBlocks.first().isVisible()) {
			// 코드 하이라이팅 클래스가 있는지 확인
			const className = await codeBlocks.first().getAttribute('class');
			expect(className).toBeTruthy();
		}
	});

	test('포스트 메타데이터가 표시되는지 확인', async ({ page }) => {
		await page.goto('/posts/development/web/cookies');
		
		// 작성일자가 표시되는지 확인
		const dateElement = page.locator('time, [datetime]').first();
		if (await dateElement.isVisible()) {
			const datetime = await dateElement.getAttribute('datetime');
			expect(datetime).toMatch(/\d{4}-\d{2}-\d{2}/);
		}
		
		// 카테고리 또는 태그가 표시되는지 확인
		const categoryOrTag = page.locator('[class*="category"], [class*="tag"], [href*="/category"], [href*="/tag"]').first();
		if (await categoryOrTag.isVisible()) {
			const text = await categoryOrTag.textContent();
			expect(text).toBeTruthy();
		}
	});

	test('포스트 네비게이션이 작동하는지 확인', async ({ page }) => {
		await page.goto('/');
		
		// 첫 번째 포스트 링크 클릭
		const firstPost = page.locator('article a, a[href*="/posts/"]').first();
		const postTitle = await firstPost.textContent();
		await firstPost.click();
		
		// 포스트 페이지로 이동했는지 확인
		await expect(page).toHaveURL(/\/posts\//);
		
		// 브라우저 뒤로가기가 작동하는지 확인
		await page.goBack();
		await expect(page).toHaveURL(/^[^\/]*\/?$/); // 홈페이지 URL 패턴
	});

	test('포스트 이미지가 올바르게 로드되는지 확인', async ({ page }) => {
		await page.goto('/posts/development/web/cookies');
		
		// 이미지가 있다면 로드되는지 확인
		const images = page.locator('article img, main img');
		const imageCount = await images.count();
		
		if (imageCount > 0) {
			for (let i = 0; i < imageCount; i++) {
				const img = images.nth(i);
				// 이미지가 표시되는지 확인
				await expect(img).toBeVisible();
				
				// alt 텍스트가 있는지 확인 (접근성)
				const alt = await img.getAttribute('alt');
				expect(alt).toBeDefined();
			}
		}
	});

	test('포스트 페이지 SEO 메타 태그 확인', async ({ page }) => {
		await page.goto('/posts/development/web/cookies');
		
		// Open Graph 태그 확인
		const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
		expect(ogTitle).toBeTruthy();
		
		const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
		expect(ogDescription).toBeTruthy();
		
		const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
		expect(ogUrl).toMatch(/\/posts\/development\/web\/cookies/);
		
		// 페이지 설명 메타 태그 확인
		const description = await page.locator('meta[name="description"]').getAttribute('content');
		expect(description).toBeTruthy();
	});
});