import Category from '$lib/post/Category.js';
import Post from '$lib/post/Post.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const categoryPromise = Category.getCategory(url.pathname)?.toSerialize();
	const postPromise = Post.getPosts(url.pathname)?.toSerialize();

	const [category, post] = await Promise.all([categoryPromise, postPromise]);

	const og = post ? {
			title: post.data.title,
			description: post.data.description,
			type: post ? 'article' : 'website',
			url: 'https://test.xiyo.dev' + url.pathname,
			author : Array.from(new Set(post.data.gitLog.map((entry) => entry.author))).join(', '),
			publishedTime: post.data.gitLog.at(0).datetime,
			modifiedTime: post.data.gitLog.at(-1).datetime,
		} : {};

	return {
		...(post && { title: post.data.title }),
		category,
		post,
		og
	};
}
