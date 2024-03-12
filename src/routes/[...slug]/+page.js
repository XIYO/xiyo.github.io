import CategoryManager from '$lib/CategoryManager.js';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const categoryManager = CategoryManager.instance;
	const rootCategory = categoryManager.category;

	const paths = url.pathname.split('/').slice(1);

	// 로직 1 패스를 기준으로 카테고리를 찾는다.
	let category = rootCategory;
	paths.forEach(categoryKey => {category = category.children.get(categoryKey);});
	if (category) return { category };

	// 로직 2 최초 검색에 카테고리가 없다면 문서를 찾는 것이기 때문에 부모 카테고리에서 포스트를 탐색 한다.
	else if (!category) {
		const postKey = paths.pop();
		category = rootCategory;
		paths.forEach(categoryKey => {category = category.children.get(categoryKey);});
		const post = category.posts.get(postKey);

		if (!post) return error(404, `Could not find ${url.pathname}`);

		const data = await post();
		const markdown = data.default;

		return { markdown };
	}

	return error(404, `Could not find ${url.pathname}`);
}