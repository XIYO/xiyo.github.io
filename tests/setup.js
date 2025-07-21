/**
 * Vitest 브라우저 테스트 셋업
 * 모든 테스트 파일 실행 전에 한 번 실행됨
 */

// 전역 설정
globalThis.IS_VITEST = true;

// 테스트 유틸리티 함수들
globalThis.testUtils = {
	// 대기 함수
	wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
	
	// 요소가 나타날 때까지 대기
	waitForElement: async (selector, timeout = 5000) => {
		const start = Date.now();
		while (Date.now() - start < timeout) {
			const element = document.querySelector(selector);
			if (element) return element;
			await new Promise(resolve => setTimeout(resolve, 100));
		}
		throw new Error(`Element ${selector} not found within ${timeout}ms`);
	}
};

// 콘솔 에러 캐치 (테스트 중 예상치 못한 에러 감지)
const originalError = console.error;
console.error = (...args) => {
	// 무시할 에러 패턴
	const ignoredPatterns = [
		/ResizeObserver loop limit exceeded/,
		/Non-Error promise rejection captured/
	];
	
	const message = args.join(' ');
	if (!ignoredPatterns.some(pattern => pattern.test(message))) {
		originalError(...args);
	}
};

// 테스트 환경임을 표시
document.documentElement.setAttribute('data-test', 'true');