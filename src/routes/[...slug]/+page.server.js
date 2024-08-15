// import { error } from '@sveltejs/kit';

import Category from '$lib/post/Category.js';
import Post from '$lib/post/Post.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const categoryPromise = Category.getCategory(url.pathname)?.toSerialize();
	const postPromise = Post.getPosts(url.pathname)?.toSerialize();

	const [category, post] = await Promise.all([categoryPromise, postPromise]);

	const title = post?.data.title || category?.name || undefined;

	return {
		title,
		category,
		post
	};

	// return error(404, `Could not find ${url.pathname}`);
}
