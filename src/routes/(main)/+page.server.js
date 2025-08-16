import Category from '$lib/post/Category.js';
import * as m from '$lib/paraglide/messages.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const root = Category.getCategory('');
	const posts = await root?.getAllPosts();
	const recent = (posts ?? []).slice(0, 50).map(post => ({
		absolutePath: post.absolutePath,
		data: post.data
	}));

	// Naver-specific meta enhancements
	const meta = {
		title: m.title(),
		description: m.description(),
		type: 'website',
		robots: 'index, follow',
		// Naver recognizes these tags
		subject: 'Development Blog',
		classification: 'Technology',
		publisher: 'xiyo.dev',
		// Additional Naver-friendly keywords in Korean
		keywords: '개발 블로그, 프로그래밍, 웹 개발, SvelteKit, JavaScript, TypeScript, 소프트웨어 개발, 기술 블로그, xiyo, 개발자 블로그',
		author: 'XIYO',
		// Cache control for better crawling
		cacheControl: 'public, max-age=3600',
		// Naver-specific OpenGraph tags
		ogLocale: url.pathname.startsWith('/en-us') ? 'en_US' : url.pathname.startsWith('/ja-jp') ? 'ja_JP' : 'ko_KR'
	};

	return {
		recent,
		meta
	};
}