// basic.spec.mjs
// 가장 간단한 Playwright 테스트: 메인 페이지가 정상적으로 열리는지 확인

import { test, expect } from '@playwright/test';

test('메인 페이지가 정상적으로 열리는지 확인', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/xiyo|Xiyo|시요|이요의 홀/);
});

test('페이지에 네비게이션이 있는지 확인', async ({ page }) => {
	await page.goto('/');
	// 네비게이션 요소가 존재하는지 확인 (visible 여부와 상관없이)
	await expect(page.locator('nav')).toBeAttached();
});

test('메인 페이지에 콘텐츠가 로드되는지 확인', async ({ page }) => {
	await page.goto('/');
	// 페이지가 완전히 로드될 때까지 기다림
	await page.waitForLoadState('networkidle');
	// body 내용이 비어있지 않은지 확인
	const bodyText = await page.locator('body').textContent();
	expect(bodyText.length).toBeGreaterThan(0);
});

test('페이지 응답 상태가 200인지 확인', async ({ page }) => {
	const response = await page.goto('/');
	expect(response.status()).toBe(200);
});
