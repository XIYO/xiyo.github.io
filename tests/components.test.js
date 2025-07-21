import { describe, test, expect } from 'vitest';
import { page, userEvent } from '@vitest/browser/context';

/**
 * 컴포넌트 레벨 테스트
 * app.test.js와 함께 같은 환경에서 실행
 */

describe('UI 컴포넌트 테스트', () => {
	test('버튼 상호작용', async () => {
		// 모든 버튼 찾기
		const buttons = page.getByRole('button');
		const buttonCount = await buttons.count();
		
		if (buttonCount > 0) {
			// 첫 번째 버튼에 포커스
			const firstButton = buttons.first();
			await userEvent.click(firstButton);
			
			// 포커스 상태 확인
			const focusedElement = document.activeElement;
			expect(focusedElement?.tagName).toBe('BUTTON');
		}
	});
	
	test('링크 접근성', async () => {
		const links = page.getByRole('link');
		const linkCount = await links.count();
		
		for (let i = 0; i < linkCount; i++) {
			const link = links.nth(i);
			
			// href 속성 확인
			const href = await link.getAttribute('href');
			expect(href).toBeTruthy();
			
			// 외부 링크는 target="_blank"와 rel 속성 확인
			if (href && href.startsWith('http')) {
				const target = await link.getAttribute('target');
				const rel = await link.getAttribute('rel');
				
				if (target === '_blank') {
					expect(rel).toContain('noopener');
				}
			}
		}
	});
	
	test('폼 요소 레이블', async () => {
		// 모든 input 요소
		const textboxes = page.getByRole('textbox');
		const checkboxes = page.getByRole('checkbox');
		const radios = page.getByRole('radio');
		
		const checkInputs = async (inputs) => {
			const count = await inputs.count();
			for (let i = 0; i < count; i++) {
				const input = inputs.nth(i);
				const id = await input.getAttribute('id');
				
				if (id) {
					// 연결된 label 확인
					const label = page.locator(`label[for="${id}"]`);
					const labelExists = (await label.count()) > 0;
					
					// aria-label 대체 확인
					const ariaLabel = await input.getAttribute('aria-label');
					const ariaLabelledby = await input.getAttribute('aria-labelledby');
					
					expect(labelExists || ariaLabel || ariaLabelledby).toBeTruthy();
				}
			}
		};
		
		await checkInputs(textboxes);
		await checkInputs(checkboxes);
		await checkInputs(radios);
	});
	
	test('이미지 성능', async () => {
		const images = page.getByRole('img');
		const imageCount = await images.count();
		
		for (let i = 0; i < imageCount; i++) {
			const img = images.nth(i);
			
			// loading 속성 확인 (lazy loading)
			const loading = await img.getAttribute('loading');
			const isAboveFold = await img.evaluate(el => {
				const rect = el.getBoundingClientRect();
				return rect.top < window.innerHeight;
			});
			
			// 스크롤 없이 보이는 이미지가 아니면 lazy loading
			if (!isAboveFold) {
				expect(loading).toBe('lazy');
			}
			
			// srcset 확인 (반응형 이미지)
			const srcset = await img.getAttribute('srcset');
			if (srcset) {
				expect(srcset).toContain(','); // 여러 해상도
			}
		}
	});
});

describe('다크 모드 지원', () => {
	test('다크 모드 토글', async () => {
		// 다크 모드 버튼 찾기
		const darkModeButton = page.getByRole('button').filter({ 
			hasText: /dark|theme|다크|테마/i 
		});
		
		if ((await darkModeButton.count()) > 0) {
			const htmlElement = document.documentElement;
			const initialTheme = htmlElement.classList.contains('dark') || 
			                    htmlElement.getAttribute('data-theme') === 'dark';
			
			// 토글 클릭
			await userEvent.click(darkModeButton.first());
			
			// 테마 변경 확인
			await new Promise(resolve => setTimeout(resolve, 100)); // 트랜지션 대기
			const newTheme = htmlElement.classList.contains('dark') || 
			                htmlElement.getAttribute('data-theme') === 'dark';
			
			expect(newTheme).not.toBe(initialTheme);
		}
	});
	
	test('시스템 설정 따르기', () => {
		// prefers-color-scheme 미디어 쿼리 확인
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
		
		// CSS가 미디어 쿼리를 지원하는지 확인
		const styles = Array.from(document.styleSheets);
		const hasColorSchemeMedia = styles.some(sheet => {
			try {
				const rules = Array.from(sheet.cssRules || []);
				return rules.some(rule => 
					rule instanceof CSSMediaRule && 
					rule.conditionText?.includes('prefers-color-scheme')
				);
			} catch {
				return false;
			}
		});
		
		// 다크 모드 지원하면 미디어 쿼리도 있어야 함
		if (document.documentElement.style.getPropertyValue('--color-scheme')) {
			expect(hasColorSchemeMedia).toBe(true);
		}
	});
});