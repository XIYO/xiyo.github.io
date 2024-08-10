// import { error } from '@sveltejs/kit';

import Category from '$lib/post/Category.js';
import Post from '$lib/post/Post.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, locals }) {
	const post = Post.getPosts(url.pathname);
	const category = Category.getCategory(url.pathname);
	if (post) {
		await post.isReady();
	}

	const title = post?.title || category?.name || undefined;

	return {
		title,
		post: post?.toSerialize(),
		category: category?.toSerialize()
	};

	// return error(404, `Could not find ${url.pathname}`);
}
