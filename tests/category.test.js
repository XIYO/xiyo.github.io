import { describe, it, expect } from 'vitest';

describe('Category and Post baseLocale fallback', () => {
	it('should return correct localized paths for each locale', async () => {
		// 동적 import를 사용하여 모듈 로드
		const { localizeHref, baseLocale, locales } = await import('../src/lib/paraglide/runtime.js');
		
		// 각 locale에 대해 동적으로 테스트
		locales.forEach(locale => {
			const result = localizeHref('/about', { locale });
			if (locale === baseLocale) {
				// baseLocale은 프리픽스가 없어야 함
				expect(result).toBe('/about');
			} else {
				// 다른 locale은 프리픽스가 있어야 함
				expect(result).toBe(`/${locale}/about`);
			}
		});
		
		// baseLocale이 설정되어 있는지 확인
		expect(baseLocale).toBeDefined();
		expect(locales).toContain(baseLocale);
	});

	it('should find baseLocale content when accessing paths without language prefix', async () => {
		// 동적 import
		const { baseLocale, locales } = await import('../src/lib/paraglide/runtime.js');
		const { default: Category } = await import('../src/lib/post/Category.js');
		const { default: Post } = await import('../src/lib/post/Post.js');
		
		const baseLocaleLower = baseLocale.toLowerCase();
		
		// 카테고리 테스트: 각 locale의 posts 카테고리가 존재하는지 확인
		const categoryByLocale = {};
		locales.forEach(locale => {
			const localeLower = locale.toLowerCase();
			const category = Category.getCategory(`/${localeLower}/posts`);
			if (category) {
				categoryByLocale[locale] = category;
				console.log(`${locale} posts category found`);
			}
		});
		
		// baseLocale 카테고리가 존재해야 함
		expect(categoryByLocale[baseLocale]).toBeDefined();
		
		// 프리픽스 없는 경로로 접근 시 baseLocale 콘텐츠를 찾아야 함
		const postsCategory = Category.getCategory('/posts');
		expect(postsCategory).toBeDefined();
		expect(postsCategory).toBe(categoryByLocale[baseLocale]);
		
		// Post 테스트: about 파일이 baseLocale에 있는지 확인
		const baseAboutPost = Post.getPosts(`/${baseLocaleLower}/about`);
		const aboutPost = Post.getPosts('/about');
		
		console.log(`${baseLocale} about post:`, baseAboutPost !== undefined);
		console.log('About post without prefix:', aboutPost !== undefined);
		
		// 두 경로 모두 Post를 찾을 수 있어야 함
		expect(baseAboutPost).toBeDefined();
		expect(aboutPost).toBeDefined();
	});
});