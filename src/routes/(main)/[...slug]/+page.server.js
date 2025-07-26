import Category from '$lib/post/Category.js';
import Post from '$lib/post/Post.js';
import * as m from '$lib/paraglide/messages.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	try {
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

		// Safe title and description extraction with fallbacks
		const title = postMetadata?.data?.title || category?.name || m.title();
		const description = postMetadata?.data?.description || m.description();

		// Safe OG metadata construction
		const og = postMetadata?.data
			? {
					title: postMetadata.data.title || m.title(),
					description: postMetadata.data.description || m.description(),
					keywords: postMetadata.data.keywords || [],
					type: 'article',
					url: url.href,
					publishedTime: postMetadata.data.dates?.[0] || null,
					modifiedTime: postMetadata.data.dates?.at(-1) || null,
					tags: postMetadata.data.tags || []
				}
			: {
					title: m.title(),
					description: m.description(),
					type: 'website',
					url: url.href
				};

		return {
			title,
			description,
			category,
			postMetadata,
			postContent,
			og
		};
	} catch (error) {
		console.error(`Error loading page data for ${url.pathname}:`, error);

		// Return error fallback data
		return {
			title: 'Error Loading Page',
			description: 'This page could not be loaded',
			category: null,
			postMetadata: null,
			postContent: null,
			og: {
				title: 'Error Loading Page',
				description: 'This page could not be loaded',
				type: 'website',
				url: url.href
			}
		};
	}
}
