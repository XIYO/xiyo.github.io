import { response } from 'super-sitemap';
import Category from '$lib/post/Category.js';

export const prerender = true;

export const GET = async ({ url }) => {
	const rootCategory = Category.getCategory('');
	const categories = rootCategory.allChildCategories;
	const posts = rootCategory.allPosts;

	// slice(1)은 super-sitemap 이 이미 /를 먼저 붙여놔서 내 코드에서는 제거 ex xiyo.dev//posts -> xiyo.dev/posts
	const paths = [
		...categories.map((category) => category.absolutePath.slice(1)),
		...posts.map((post) => post.absolutePath.slice(1))
	];

	return await response({
		origin: url.origin,
		paramValues: {
			'/[...slug]': paths
		},
		sort: 'alpha',
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
