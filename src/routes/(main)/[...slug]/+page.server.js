import Category from '$lib/post/Category.js';
import Post from '$lib/post/Post.js';
import * as m from '$lib/paraglide/messages.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const categoryPromise = Category.getCategory(url.pathname)?.toSerialize();
	const postInstance = Post.getPosts(url.pathname);

	// 포스트가 있으면 메타데이터와 콘텐츠를 분리해서 가져오기
	const postMetadataPromise = postInstance?.getMetadata();
	const postContentPromise = postInstance?.getContent();

	const [category, postMetadata, postContent] = await Promise.all([
		categoryPromise,
		postMetadataPromise,
		postContentPromise
	]);

	// post 가 있으면 반드시 postMetadata.data 가 있기 때문에 null 체크를 하지 않아도 된다.
	const title = postMetadata ? postMetadata.data.title : category ? category.name : m.title();
	const description = postMetadata ? postMetadata.data.description : m.description();

	const og = postMetadata
		? {
				title: postMetadata.data.title,
				description: postMetadata.data.description,
				keywords: postMetadata.data.keywords,
				type: 'article',
				url: url.href,
				publishedTime: postMetadata.data.dates?.at(0),
				modifiedTime: postMetadata.data.dates?.at(-1),
				tags: postMetadata.data.tags
			}
		: {};

	return {
		title,
		description,
		category,
		postMetadata,
		postContent,
		og
	};
}
