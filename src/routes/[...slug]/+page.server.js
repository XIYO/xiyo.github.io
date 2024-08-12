// import { error } from '@sveltejs/kit';

import Category from '$lib/post/Category.js';
import Post from '$lib/post/Post.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const post = Post.getPosts(url.pathname)?.toSerialize();
	const category = Category.getCategory(url.pathname)?.toSerialize();

	return {
		title: post?.frontmatter.title || category?.name || undefined,
		post: post,
		category: category
	};

	// return error(404, `Could not find ${url.pathname}`);
}
