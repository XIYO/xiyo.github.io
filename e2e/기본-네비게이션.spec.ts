import { test, expect } from '@playwright/test';

test.describe('기본 네비게이션 테스트', () => {
	test('홈페이지가 정상적으로 로드되는지 확인', async ({ page }) => {
		await page.goto('/');

		// 페이지 타이틀 확인
		await expect(page).toHaveTitle(/xiyo\.dev/);

		// 헤더가 표시되는지 확인
		const header = page.locator('header');
		await expect(header).toBeVisible();

		// 로고/사이트 이름이 표시되는지 확인
		const siteName = page.getByText('xiyo.dev');
		await expect(siteName.first()).toBeVisible();
	});

	test('메인 네비게이션 메뉴가 작동하는지 확인', async ({ page }) => {
		await page.goto('/');

		// 네비게이션 메뉴 존재 확인
		const nav = page.locator('nav');
		await expect(nav.first()).toBeVisible();

		// 포스트 링크 클릭 테스트
		const firstPostLink = page.locator('article a').first();
		if (await firstPostLink.isVisible()) {
			await firstPostLink.click();
			// URL이 /posts/로 시작하는지 확인
			await expect(page).toHaveURL(/\/posts\//);
		}
	});

	test('404 페이지가 올바르게 표시되는지 확인', async ({ page }) => {
		// 존재하지 않는 페이지로 이동
		await page.goto('/존재하지않는페이지');

		// 404 또는 에러 메시지가 표시되는지 확인
		const errorMessage = page.getByText(/404|찾을 수 없|not found/i);
		await expect(errorMessage.first()).toBeVisible();
	});

	test('반응형 디자인이 작동하는지 확인', async ({ page }) => {
		await page.goto('/');

		// 데스크톱 뷰포트
		await page.setViewportSize({ width: 1920, height: 1080 });
		await expect(page.locator('header')).toBeVisible();

		// 태블릿 뷰포트
		await page.setViewportSize({ width: 768, height: 1024 });
		await expect(page.locator('header')).toBeVisible();

		// 모바일 뷰포트
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(page.locator('header')).toBeVisible();
	});
});
