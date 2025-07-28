import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { locales, baseLocale } from '$lib/paraglide/runtime';
import { dev } from '$app/environment';
import Post from '$lib/post/Post.js';

/**
 * Generate sitemap.xml dynamically
 * @type {import('./$types').RequestHandler}
 */
export async function GET() {
	try {
		const urls = await generateAllUrls();
		const sitemap = generateSitemapXml(urls);

		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': dev ? 'no-cache' : 'public, max-age=3600'
			}
		});
	} catch (error) {
		console.error('사이트맵 생성 오류:', error);
		return new Response('사이트맵 생성에 실패했습니다', { status: 500 });
	}
}

/**
 * Prerender this route
 */
export const prerender = true;

/**
 * Generate all URLs for sitemap
 */
async function generateAllUrls() {
	const urls = new Set();

	// 홈페이지 추가
	for (const locale of locales) {
		if (locale === baseLocale) {
			urls.add({
				url: '/',
				priority: 1.0,
				changefreq: 'daily',
				lastmod: new Date().toISOString().split('T')[0]
			});
		} else {
			urls.add({
				url: `/${locale}/`,
				priority: 1.0,
				changefreq: 'daily',
				lastmod: new Date().toISOString().split('T')[0]
			});
		}
	}

	// 각 언어별 URL 스캔
	for (const locale of locales) {
		const localeUrls = await scanLocaleUrls(locale);
		localeUrls.forEach((url) => urls.add(url));
	}

	return Array.from(urls);
}

/**
 * Scan URLs for specific locale
 */
async function scanLocaleUrls(locale) {
	const urls = new Set();
	const staticPath = join(process.cwd(), 'static', locale);

	try {
		await scanDirectory(staticPath, locale, '', urls);
	} catch (error) {
		console.warn(`⚠️  ${locale} 디렉토리 스캔 실패:`, error.message);
	}

	return Array.from(urls);
}

/**
 * Recursively scan directory
 */
async function scanDirectory(dirPath, locale, relativePath, urls) {
	try {
		const entries = await readdir(dirPath);

		for (const entry of entries) {
			// assets, 숨김 파일 제외
			if (entry.startsWith('.') || entry === 'assets') {
				continue;
			}

			const fullPath = join(dirPath, entry);
			const stats = await stat(fullPath);
			const currentPath = relativePath ? `${relativePath}/${entry}` : `/${entry}`;

			if (stats.isDirectory()) {
				// 디렉토리는 카테고리 URL로 추가
				const categoryUrl = locale === baseLocale ? currentPath : `/${locale}${currentPath}`;

				urls.add({
					url: categoryUrl,
					priority: getPriority(categoryUrl),
					changefreq: getChangeFreq(categoryUrl),
					lastmod: stats.mtime.toISOString().split('T')[0]
				});

				// 하위 디렉토리 재귀 스캔
				await scanDirectory(fullPath, locale, currentPath, urls);
			} else if (entry.endsWith('.md')) {
				// 마크다운 파일은 포스트 URL로 추가
				const postPath = currentPath.replace(/\.md$/, '');
				const postUrl = locale === baseLocale ? postPath : `/${locale}${postPath}`;

				// 포스트 메타데이터에서 정확한 수정일 가져오기
				const lastmod = await getPostLastModified(postUrl, stats);

				urls.add({
					url: postUrl,
					priority: getPriority(postUrl),
					changefreq: getChangeFreq(postUrl),
					lastmod: lastmod
				});
			}
		}
	} catch (error) {
		console.warn(`디렉토리 스캔 실패 ${dirPath}:`, error.message);
	}
}

/**
 * Get URL priority
 */
function getPriority(url) {
	// 홈페이지 = 최고 우선순위
	if (url === '/' || url.match(/^\/(en-us|ja-jp)\/?$/)) {
		return 1.0;
	}

	// 메인 카테고리 (/posts, /posts/development 등)
	if (url.match(/^(\/[^/]+)?\/posts\/?$/) || url.match(/^(\/[^/]+)?\/posts\/[^/]+\/?$/)) {
		return 0.8;
	}

	// 서브 카테고리
	if (url.match(/^(\/[^/]+)?\/posts\/[^/]+\/[^/]+\/?$/) && !url.includes('.')) {
		return 0.6;
	}

	// 개별 포스트
	return 0.5;
}

/**
 * Get change frequency
 */
function getChangeFreq(url) {
	// 홈페이지 = 매일
	if (url === '/' || url.match(/^\/(en-us|ja-jp)\/?$/)) {
		return 'daily';
	}

	// 메인 카테고리 = 주간
	if (url.match(/^(\/[^/]+)?\/posts\/?$/) || url.match(/^(\/[^/]+)?\/posts\/[^/]+\/?$/)) {
		return 'weekly';
	}

	// 개별 포스트, 서브카테고리 = 월간
	return 'monthly';
}

/**
 * Get accurate last modified date for a post
 * Priority: metadata.lastModified > metadata.modified > metadata.dates.last > file mtime
 */
async function getPostLastModified(postUrl, fileStats) {
	try {
		// 포스트 인스턴스 가져오기
		const postInstance = Post.getPosts(postUrl);
		if (!postInstance) {
			return fileStats.mtime.toISOString().split('T')[0];
		}

		// 메타데이터 가져오기
		const metadata = await postInstance.getMetadata();
		if (!metadata?.data) {
			return fileStats.mtime.toISOString().split('T')[0];
		}

		const data = metadata.data;

		// 1순위: lastModified 필드
		if (data.lastModified) {
			return new Date(data.lastModified).toISOString().split('T')[0];
		}

		// 2순위: modified 필드
		if (data.modified) {
			return new Date(data.modified).toISOString().split('T')[0];
		}

		// 3순위: dates 배열의 마지막 날짜
		if (data.dates && Array.isArray(data.dates) && data.dates.length > 0) {
			const lastDate = data.dates[data.dates.length - 1];
			return new Date(lastDate).toISOString().split('T')[0];
		}

		// 4순위: 파일 시스템 수정 시간
		return fileStats.mtime.toISOString().split('T')[0];
	} catch (error) {
		console.warn(`포스트 메타데이터 로드 실패 ${postUrl}:`, error.message);
		return fileStats.mtime.toISOString().split('T')[0];
	}
}

/**
 * Generate sitemap XML
 */
function generateSitemapXml(urls) {
	const urlEntries = urls
		.map(
			({ url, priority, changefreq, lastmod }) => `
  <url>
    <loc>https://blog.xiyo.dev${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
		)
		.join('');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}
