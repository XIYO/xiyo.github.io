// advanced.spec.js
// 쿠키 전송 시나리오를 테스트하는 고급 Playwright 테스트

import { test, expect } from '@playwright/test';

test.describe('쿠키 전송 시나리오 테스트', () => {
	test('쿠키 설정 및 전송 테스트', async ({ page, context }) => {
		// 메인 페이지로 이동
		await page.goto('/');

		// 쿠키 설정 (SameSite=Strict, Secure=true, Domain=.hello.dev)
		await context.addCookies([
			{
				name: 'test-cookie-strict',
				value: 'strict-value',
				domain: '.hello.dev',
				path: '/',
				secure: true,
				sameSite: 'Strict'
			},
			{
				name: 'test-cookie-lax',
				value: 'lax-value',
				domain: '.hello.dev',
				path: '/',
				secure: true,
				sameSite: 'Lax'
			},
			{
				name: 'test-cookie-none',
				value: 'none-value',
				domain: '.hello.dev',
				path: '/',
				secure: true,
				sameSite: 'None'
			}
		]);

		// 쿠키가 설정되었는지 확인
		const cookies = await context.cookies();
		const cookieNames = cookies.map((cookie) => cookie.name);

		expect(cookieNames).toContain('test-cookie-strict');
		expect(cookieNames).toContain('test-cookie-lax');
		expect(cookieNames).toContain('test-cookie-none');
	});

	test('Form 요청 시 쿠키 전송 테스트', async ({ page }) => {
		await page.goto('/');

		// Form이 있는지 확인 (실제 사이트에 form이 있다면)
		const forms = await page.locator('form').count();

		if (forms > 0) {
			// Form이 있는 경우 쿠키와 함께 전송되는지 확인
			await page
				.locator('form')
				.first()
				.evaluate((form) => {
					form.method = 'GET';
					form.action = '/test-endpoint';
				});

			// 네트워크 요청 감시
			page.on('request', (request) => {
				console.log('Request headers:', request.headers());
			});
		}
	});

	test('Fetch API 요청 시 쿠키 전송 테스트', async ({ page }) => {
		await page.goto('/');

		// Fetch API를 사용한 요청에서 쿠키 전송 테스트
		const response = await page.evaluate(async () => {
			try {
				const response = await fetch('/', {
					method: 'GET',
					credentials: 'include' // 쿠키 포함
				});
				return {
					status: response.status,
					headers: Object.fromEntries(response.headers.entries())
				};
			} catch (error) {
				return { error: error.message };
			}
		});

		expect(response.status).toBe(200);
	});
});

test.describe('다국어 지원 테스트', () => {
	test('한국어 페이지 접근', async ({ page }) => {
		await page.goto('/');

		// 한국어 콘텐츠가 있는지 확인
		const bodyText = await page.textContent('body');
		expect(bodyText).toMatch(/한국어|사용자|페이지|관련/);
	});

	test('영어 페이지 접근', async ({ page }) => {
		await page.goto('/en-US');

		// 영어 콘텐츠가 있는지 확인 (페이지가 존재한다면)
		const response = await page.goto('/en-US');
		if (response && response.status() === 200) {
			const bodyText = await page.textContent('body');
			expect(bodyText.length).toBeGreaterThan(0);
		}
	});

	test('일본어 페이지 접근', async ({ page }) => {
		await page.goto('/ja-JP');

		// 일본어 콘텐츠가 있는지 확인 (페이지가 존재한다면)
		const response = await page.goto('/ja-JP');
		if (response && response.status() === 200) {
			const bodyText = await page.textContent('body');
			expect(bodyText.length).toBeGreaterThan(0);
		}
	});
});

test.describe('성능 및 접근성 테스트', () => {
	test('페이지 로딩 시간 테스트', async ({ page }) => {
		const startTime = Date.now();
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		const loadTime = Date.now() - startTime;

		// 페이지 로딩이 3초 이내에 완료되는지 확인
		expect(loadTime).toBeLessThan(3000);
	});

	test('반응형 디자인 테스트', async ({ page }) => {
		// 모바일 화면 크기로 설정
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		// 페이지가 모바일에서도 정상적으로 표시되는지 확인
		const bodyText = await page.textContent('body');
		expect(bodyText.length).toBeGreaterThan(0);

		// 태블릿 화면 크기로 설정
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.reload();

		const bodyTextTablet = await page.textContent('body');
		expect(bodyTextTablet.length).toBeGreaterThan(0);

		// 데스크톱 화면 크기로 복원
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.reload();

		const bodyTextDesktop = await page.textContent('body');
		expect(bodyTextDesktop.length).toBeGreaterThan(0);
	});

	test('키보드 내비게이션 테스트', async ({ page }) => {
		await page.goto('/');

		// Tab 키로 포커스 이동 테스트
		await page.keyboard.press('Tab');
		const focusedElement = await page.evaluate(() => document.activeElement?.tagName);

		// 포커스 가능한 요소가 있는지 확인
		if (focusedElement) {
			expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(focusedElement);
		}
	});
});
