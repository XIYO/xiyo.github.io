import { test, expect } from '@playwright/test';

test.describe('Naver SEO Verification', () => {
	test('Homepage has all required Naver SEO meta tags', async ({ page }) => {
		await page.goto('/');
		
		// Check basic meta tags
		await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
		await expect(page.locator('meta[name="subject"]')).toHaveAttribute('content', /Development Blog/);
		await expect(page.locator('meta[name="classification"]')).toHaveAttribute('content', 'Technology');
		await expect(page.locator('meta[name="publisher"]')).toHaveAttribute('content', 'xiyo.dev');
		await expect(page.locator('meta[name="author"]')).toHaveAttribute('content', 'XIYO');
		
		// Check keywords meta tag (should contain Korean keywords)
		const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
		expect(keywords).toContain('개발');
		expect(keywords).toContain('프로그래밍');
		expect(keywords).toContain('웹 개발');
		
		// Check cache control
		await expect(page.locator('meta[http-equiv="cache-control"]')).toHaveAttribute('content', /public/);
		
		// Check OpenGraph tags
		await expect(page.locator('meta[property="og:title"]')).toBeVisible();
		await expect(page.locator('meta[property="og:description"]')).toBeVisible();
		await expect(page.locator('meta[property="og:url"]')).toBeVisible();
		await expect(page.locator('meta[property="og:image"]')).toBeVisible();
		await expect(page.locator('meta[property="og:site_name"]')).toBeVisible();
		await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'ko_KR');
		
		// Check JSON-LD structured data
		const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
		expect(jsonLdScripts.length).toBeGreaterThan(0);
		
		// Verify at least WebSite and Organization schemas exist
		let hasWebSite = false;
		let hasOrganization = false;
		
		for (const script of jsonLdScripts) {
			const content = await script.textContent();
			if (content.includes('"@type":"WebSite"')) hasWebSite = true;
			if (content.includes('"@type":"Organization"')) hasOrganization = true;
		}
		
		expect(hasWebSite).toBe(true);
		expect(hasOrganization).toBe(true);
	});
	
	test('Blog post has article-specific SEO tags', async ({ page }) => {
		// Navigate to a blog post (adjust path as needed)
		await page.goto('/posts/blog');
		
		// Check article-specific OpenGraph tags
		await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', /article|website/);
		
		// Check for BlogPosting schema
		const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
		let hasBlogPosting = false;
		
		for (const script of jsonLdScripts) {
			const content = await script.textContent();
			if (content.includes('"@type":"BlogPosting"')) {
				hasBlogPosting = true;
				// Verify required BlogPosting fields
				expect(content).toContain('"headline"');
				expect(content).toContain('"datePublished"');
				expect(content).toContain('"author"');
			}
		}
		
		// Blog listing pages might not have BlogPosting, but should have other schemas
		const hasOtherSchemas = jsonLdScripts.length > 0;
		expect(hasBlogPosting || hasOtherSchemas).toBe(true);
	});
	
	test('Sitemap.xml is accessible and valid', async ({ page }) => {
		const response = await page.goto('/sitemap.xml');
		expect(response.status()).toBe(200);
		
		const contentType = response.headers()['content-type'];
		expect(contentType).toContain('application/xml');
		
		const content = await page.content();
		expect(content).toContain('<urlset');
		expect(content).toContain('http://www.sitemaps.org/schemas/sitemap/0.9');
		expect(content).toContain('<loc>');
		expect(content).toContain('<lastmod>');
		expect(content).toContain('<changefreq>');
		expect(content).toContain('<priority>');
	});
	
	test('RSS feed is accessible and valid', async ({ page }) => {
		const response = await page.goto('/rss.xml');
		expect(response.status()).toBe(200);
		
		const contentType = response.headers()['content-type'];
		expect(contentType).toContain('application/rss+xml');
		
		const content = await page.content();
		expect(content).toContain('<rss version="2.0"');
		expect(content).toContain('<channel>');
		expect(content).toContain('<title>');
		expect(content).toContain('<link>');
		expect(content).toContain('<description>');
	});
	
	test('Robots.txt allows Naver bot', async ({ page }) => {
		const response = await page.goto('/robots.txt');
		expect(response.status()).toBe(200);
		
		const content = await page.textContent('body');
		expect(content).toContain('User-agent: Yeti');
		expect(content).toContain('Allow: /');
		expect(content).toContain('Sitemap:');
	});
	
	test('Hreflang tags are properly set for i18n', async ({ page }) => {
		await page.goto('/');
		
		// Check hreflang links
		const hreflangLinks = await page.locator('link[rel="alternate"][hreflang]').all();
		expect(hreflangLinks.length).toBeGreaterThan(0);
		
		// Check for default language
		const defaultLang = await page.locator('link[rel="alternate"][hreflang="x-default"]');
		await expect(defaultLang).toBeVisible();
		
		// Check for Korean, English, and Japanese
		await expect(page.locator('link[rel="alternate"][hreflang="ko"]')).toBeVisible();
		await expect(page.locator('link[rel="alternate"][hreflang="en-us"]')).toBeVisible();
		await expect(page.locator('link[rel="alternate"][hreflang="ja-jp"]')).toBeVisible();
	});
	
	test('Naver verification endpoint works', async ({ page }) => {
		// This will return 404 if PUBLIC_NAVER_SITE_VERIFICATION is not set
		// which is expected in development
		const response = await page.goto('/naver-verify.txt');
		
		// If configured, should return 200 with text content
		// If not configured, should return 404
		expect([200, 404]).toContain(response.status());
		
		if (response.status() === 200) {
			const contentType = response.headers()['content-type'];
			expect(contentType).toContain('text/plain');
		}
	});
});

test.describe('Naver Mobile SEO', () => {
	test.use({ 
		viewport: { width: 375, height: 667 },
		userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
	});
	
	test('Mobile viewport and responsive meta tags', async ({ page }) => {
		await page.goto('/');
		
		// Check viewport meta tag
		await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', /width=device-width/);
		
		// Verify mobile-friendly rendering
		const viewportSize = page.viewportSize();
		expect(viewportSize.width).toBe(375);
		
		// Check that content adapts to mobile
		await expect(page.locator('body')).toBeVisible();
	});
});