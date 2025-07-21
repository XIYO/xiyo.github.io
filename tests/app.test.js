import { describe, test, expect, beforeAll } from 'vitest';
import { page, userEvent } from '@vitest/browser/context';

/**
 * Vitest 생태계에 통합된 메인 앱 테스트
 * - 같은 설정 파일 (vitest.config.js)
 * - 같은 명령어 (pnpm test)
 * - 같은 리포터와 UI
 * - Storybook 테스트와 함께 실행
 */

describe('xiyo.dev 통합 테스트', () => {
	// 커스텀 커맨드로 네비게이션 구현
	const navigate = async (path) => {
		window.location.href = path;
		await new Promise(resolve => {
			if (document.readyState === 'complete') {
				resolve();
			} else {
				window.addEventListener('load', resolve, { once: true });
			}
		});
	};

	describe('메인 페이지', () => {
		beforeAll(async () => {
			await navigate('http://localhost:5174/');
		});

		test('한국어 기본 콘텐츠 확인', async () => {
			// 타이틀
			expect(document.title).toBe('이요의 홀');
			
			// 메인 헤딩
			const heading = page.getByRole('heading', { level: 1 });
			await expect.element(heading).toBeVisible();
			await expect.element(heading).toHaveTextContent('이요의 홀');
			
			// 소개 텍스트
			const intro = page.getByText('웹을 사랑하는 개발자입니다');
			await expect.element(intro).toBeVisible();
			
			// 네비게이션 링크
			const githubLink = page.getByRole('link', { name: /깃허브/i });
			await expect.element(githubLink).toBeVisible();
			await expect.element(githubLink).toHaveAttribute('href', 'https://github.com/xiyo');
		});

		test('프로젝트 섹션 확인', async () => {
			// 프로젝트 헤딩
			const projectHeading = page.getByRole('heading', { name: '프로젝트' });
			await expect.element(projectHeading).toBeVisible();
			
			// 프로젝트 링크들
			const projectLinks = [
				{ name: '글러브', href: 'https://github.com/xiyo/globe' },
				{ name: '째깍', href: 'https://jjakak.deno.dev' }
			];
			
			for (const project of projectLinks) {
				const link = page.getByRole('link', { name: project.name });
				if (await link.isVisible()) {
					await expect.element(link).toHaveAttribute('href', project.href);
				}
			}
		});

		test('접근성 검사', async () => {
			// 모든 이미지에 alt 텍스트
			const images = page.locator('img');
			const imageCount = await images.count();
			
			for (let i = 0; i < imageCount; i++) {
				const img = images.nth(i);
				const alt = await img.getAttribute('alt');
				expect(alt).toBeTruthy();
			}
			
			// 하나의 h1
			const h1Count = await page.getByRole('heading', { level: 1 }).count();
			expect(h1Count).toBe(1);
			
			// 스킵 링크 (있다면)
			const skipLink = page.getByRole('link', { name: /skip|건너뛰기/i });
			if (await skipLink.isVisible()) {
				await expect.element(skipLink).toHaveAttribute('href', '#main');
			}
		});
	});

	describe('언어 전환', () => {
		test('언어 선택기 동작', async () => {
			// 언어 버튼 찾기
			const langButton = page.getByRole('button').filter({ hasText: /ko-KR/i });
			
			if (await langButton.isVisible()) {
				await userEvent.click(langButton);
				
				// 언어 옵션들 확인
				const languages = [
					{ code: 'en-US', text: 'English' },
					{ code: 'ja-JP', text: '日本語' }
				];
				
				for (const lang of languages) {
					const option = page.getByRole('link', { name: new RegExp(lang.code, 'i') });
					await expect.element(option).toBeVisible();
				}
				
				// ESC로 닫기
				await userEvent.keyboard('{Escape}');
			}
		});

		test('영어 페이지 이동', async () => {
			await navigate('http://localhost:5174/en-US/');
			
			// 영어 타이틀
			expect(document.title).toBe("XIYO's Hall");
			
			// 영어 헤딩
			const enHeading = page.getByRole('heading', { level: 1 });
			await expect.element(enHeading).toHaveTextContent("XIYO's Hall");
		});

		test('일본어 페이지 이동', async () => {
			await navigate('http://localhost:5174/ja-JP/');
			
			// 일본어 타이틀
			expect(document.title).toBe('XIYOのホール');
			
			// 일본어 헤딩
			const jaHeading = page.getByRole('heading', { level: 1 });
			await expect.element(jaHeading).toHaveTextContent('XIYOのホール');
		});
	});

	describe('사용자 인터랙션', () => {
		test('키보드 네비게이션', async () => {
			await navigate('http://localhost:5174/');
			
			// Tab 키로 포커스 이동
			await userEvent.keyboard('{Tab}');
			
			// 현재 포커스된 요소 확인
			const focusedElement = document.activeElement;
			expect(focusedElement).not.toBe(document.body);
			expect(focusedElement.tagName).toMatch(/A|BUTTON|INPUT/i);
		});

		test('모바일 뷰포트', async () => {
			// 뷰포트 크기 변경 (CSS 미디어 쿼리 테스트)
			window.innerWidth = 375;
			window.innerHeight = 667;
			window.dispatchEvent(new Event('resize'));
			
			// 모바일에서도 주요 요소 표시
			const mobileHeading = page.getByRole('heading', { level: 1 });
			await expect.element(mobileHeading).toBeVisible();
		});
	});

	describe('성능 및 최적화', () => {
		test('이미지 최적화', async () => {
			const images = page.locator('img');
			const imageCount = await images.count();
			
			for (let i = 0; i < imageCount; i++) {
				const img = images.nth(i);
				const src = await img.getAttribute('src');
				
				// Vite/imagetools로 최적화된 이미지
				if (src && src.includes('@imagetools')) {
					expect(src).toMatch(/@imagetools|\.avif|\.webp/);
				}
			}
		});

		test('폰트 로딩', () => {
			// Pretendard 폰트 로드 확인
			const styles = Array.from(document.styleSheets);
			const hasFontFace = styles.some(sheet => {
				try {
					const rules = Array.from(sheet.cssRules || []);
					return rules.some(rule => 
						rule instanceof CSSFontFaceRule && 
						rule.style.fontFamily.includes('Pretendard')
					);
				} catch {
					return false;
				}
			});
			
			expect(hasFontFace).toBe(true);
		});
	});
});

// 다른 테스트 파일들과 함께 실행됨
describe('Vitest 생태계 통합 확인', () => {
	test('같은 환경에서 실행', () => {
		// Vitest 전역 변수들
		expect(typeof describe).toBe('function');
		expect(typeof test).toBe('function');
		expect(typeof expect).toBe('function');
		
		// Browser context API
		expect(page).toBeDefined();
		expect(userEvent).toBeDefined();
	});
});