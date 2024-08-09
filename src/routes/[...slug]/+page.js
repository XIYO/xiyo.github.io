// import { error } from '@sveltejs/kit';

import Category from "$lib/post/Category.js";
import Post from "$lib/post/Post.js";

export async function load({ url }) {
  return {
    post: Post.getPosts(url.pathname),
    category: Category.getCategory(url.pathname),
  };

  // return error(404, `Could not find ${url.pathname}`);
}
