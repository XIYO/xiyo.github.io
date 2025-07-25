import { describe, it, expect } from 'vitest';
import Category from '../src/lib/post/Category.js';
import Post from '../src/lib/post/Post.js';

describe('Category and Post Sorting', () => {
	it('should sort posts by sortDate in descending order', async () => {
		const category = Category.getCategory('/posts');
		if (!category) {
			// posts category not found, skipping test
			return;
		}

		const posts = category.posts;
		
		// 날짜가 제대로 정렬되어 있는지 확인
		for (let i = 0; i < posts.length - 1; i++) {
			const currentDate = posts[i].sortDate;
			const nextDate = posts[i + 1].sortDate;
			
			expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
		}
		
		// Verify posts are sorted correctly by date
	});
	
	it('should sort child categories by latest post date', async () => {
		const rootCategory = Category.getCategory('/posts');
		if (!rootCategory) {
			// posts category not found, skipping test
			return;
		}

		const childCategories = rootCategory.childCategories;
		
		// 각 카테고리의 최신 포스트 날짜가 제대로 정렬되어 있는지 확인
		for (let i = 0; i < childCategories.length - 1; i++) {
			const currentLatest = childCategories[i].latestPostDate;
			const nextLatest = childCategories[i + 1].latestPostDate;
			
			expect(currentLatest.getTime()).toBeGreaterThanOrEqual(nextLatest.getTime());
		}
		
		// Verify child categories are sorted correctly
	});
	
	it('should calculate correct sortDate from Post metadata', async () => {
		// 특정 포스트를 찾아서 테스트
		const testPost = Post.getPosts('/posts/tools/ide/intellij/enable-force-push');
		if (!testPost) {
			// test post not found, skipping test
			return;
		}
		
		// 메타데이터 로드
		const metadata = await testPost.getMetadata();
		const sortDate = testPost.sortDate;
		
		// published 필드나 dates[0]이 sortDate와 일치하는지 확인
		if (metadata.data.published) {
			expect(sortDate).toEqual(new Date(metadata.data.published));
		} else if (metadata.data.dates && metadata.data.dates.length > 0) {
			expect(sortDate).toEqual(new Date(metadata.data.dates[0]));
		}
		
		// Verify post sortDate is correctly calculated
	});
	
	it('should handle posts without dates correctly', () => {
		// sortDate getter는 메타데이터가 없으면 new Date(0)을 반환해야 함
		const mockPost = new Post({
			absolutePath: '/test/mock',
			markdownAsync: () => Promise.resolve('')
		});
		
		// 메타데이터가 로드되기 전의 sortDate는 기본값이어야 함
		expect(mockPost.sortDate).toEqual(new Date(0));
	});
});