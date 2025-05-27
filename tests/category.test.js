import { describe, it, expect } from 'vitest';
import Category from '$lib/post/Category.js';

describe('Category', () => {
	it('category init test', async () => {
		const category = Category.getCategory('');
		expect(category).toBeDefined();
	});

	it('child category test', async () => {
		const category = Category.getCategory('');
		const allChildCategories = category.allChildCategories;

		console.log(await category.toSerialize());
		console.log(allChildCategories);
	}, 0);

	it('print all category names', async () => {
		const category = Category.getCategory('');
		expect(category).toBeDefined();
		if (!category) throw new Error('카테고리 루트가 없습니다');
		const all = [category, ...category.allChildCategories];
		const names = all.map((cat) => cat && cat.name);
		console.log('카테고리 이름 목록:', names);
		names.forEach((name) => expect(typeof name).toBe('string'));
	});
});
