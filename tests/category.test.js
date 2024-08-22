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

		console.log(await category.toSerialize())
		console.log(allChildCategories);
	});
});
