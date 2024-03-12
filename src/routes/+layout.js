import CategoryManager from '$lib/CategoryManager.js';
export const prerender = true;

export async function load() {
	const category = CategoryManager.instance.category;
	return { category: category.children.get('posts') };
}