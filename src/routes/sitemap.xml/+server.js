import { response } from 'super-sitemap';
import Category from '$lib/post/Category.js';
import Post from '$lib/post/Post.js';

export const prerender = true;

export const GET = async () => {
	const categories = Category.rootCategory.allChildCategories;
	const posts = Post.posts;

	const paths = [
		...categories.map((category) => category.absolutePath.slice(1)),
		...posts.map((post) => post.absolutePath.slice(1))
	];

	return await response({
		origin: 'https://blog.xiyo.dev',
		paramValues: {
			'/[...slug]': paths
		},
		sort: 'alpha'
	});
};