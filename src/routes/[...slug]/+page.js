// import { error } from '@sveltejs/kit';

import Category from "$lib/post/Category.js";
import Post from "$lib/post/Post.js";

export async function load({url}) {
    const result = {};
    result.post = Post.getPosts(url.pathname);
    result.category = Category.getCategory(url.pathname);
    return result;

    // return error(404, `Could not find ${url.pathname}`);
}