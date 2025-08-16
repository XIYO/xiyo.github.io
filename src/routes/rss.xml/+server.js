import Category from '$lib/post/Category.js';
import * as m from '$lib/paraglide/messages.js';

export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const origin = url.origin;
	const root = Category.getCategory('');
	const allPosts = await root?.getAllPosts();
	const posts = (allPosts ?? []).slice(0, 50); // Recent 50 posts

	const title = m.title();
	const description = m.description();
	const now = new Date().toUTCString();

	// Generate RSS XML
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${origin}</link>
    <description>${escapeXml(description)}</description>
    <language>ko</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml"/>
    <generator>SvelteKit</generator>
    <webMaster>xiyo.dev@gmail.com (XIYO)</webMaster>
    <managingEditor>xiyo.dev@gmail.com (XIYO)</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} XIYO</copyright>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <ttl>60</ttl>
${posts
	.map((post) => {
		const path = post.absolutePath?.startsWith('/') ? post.absolutePath : '/' + post.absolutePath;
		const postUrl = origin + path;
		const postTitle = post.data?.title || path.split('/').pop()?.replace(/-/g, ' ') || 'Untitled';
		const postDescription = post.data?.description || post.data?.messages?.[0] || '';
		const postDate = new Date(
			post.data?.modified || post.data?.created || Date.now()
		).toUTCString();
		const postAuthor = post.data?.author || 'XIYO';
		const categories = post.data?.tags || [];

		return `    <item>
      <title>${escapeXml(postTitle)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(postDescription)}</description>
      <pubDate>${postDate}</pubDate>
      <dc:creator>${escapeXml(postAuthor)}</dc:creator>
      ${categories.map((cat) => `<category>${escapeXml(cat)}</category>`).join('\n      ')}
    </item>`;
	})
	.join('\n')}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}

function escapeXml(unsafe) {
	if (!unsafe) return '';
	return String(unsafe).replace(/[<>&'"]/g, (c) => {
		switch (c) {
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '&':
				return '&amp;';
			case "'":
				return '&apos;';
			case '"':
				return '&quot;';
			default:
				return c;
		}
	});
}
