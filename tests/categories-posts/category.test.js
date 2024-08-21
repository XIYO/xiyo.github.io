import { describe, it, expect, beforeEach } from 'vitest';
import Category from '/src/lib/post/Category';

describe('카테고리 테스트', () => {
	it('카테고리 초기화 테스트', async () => {
		const root = Category.root;
		await root.toSerialize();
	});
})
