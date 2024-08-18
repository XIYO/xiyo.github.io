import Category from '$lib/post/Category.js';
import Post from '$lib/post/Post.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const categoryPromise = Category.getCategory(url.pathname)?.toSerialize();
	const postPromise = Post.getPosts(url.pathname)?.toSerialize();

	const [category, post] = await Promise.all([categoryPromise, postPromise]);

	return {
		...(post && { title: post.data.title }),
		category,
		post
	};
}
