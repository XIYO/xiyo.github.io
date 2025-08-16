import { test, expect } from '@playwright/test';

test.describe('@smoke SEO basics', () => {
	test('home has canonical, hreflang, og:image, WebSite/Organization JSON-LD and og:locale', async ({
		page,
		baseURL
	}) => {
		const home = baseURL + '/';
		await page.goto(home);

		// canonical - should end with "/" regardless of the base URL
		const canonicalHref = await page.locator('head link[rel="canonical"]').getAttribute('href');
		expect(canonicalHref).toMatch(/\/$/); // Check that it ends with /

		// hreflang (home): ko-kr/en-us/ja-jp + x-default
		const langs = ['ko-kr', 'en-us', 'ja-jp'];
		for (const lang of langs) {
			const href = await page
				.locator(`head link[rel="alternate"][hreflang="${lang}"]`)
				.getAttribute('href');
			expect(href).toBeDefined();
		}
		const xdefault = await page
			.locator('head link[rel="alternate"][hreflang="x-default"]')
			.getAttribute('href');
		expect(xdefault).toBeDefined();

		// og:image present and absolute URL
		const ogImg = await page.locator('head meta[property="og:image"]').getAttribute('content');
		expect(ogImg).toBeTruthy();
		expect(String(ogImg)).toMatch(/^https?:\/\//);

		// JSON-LD WebSite present
		const ldJsonTexts = await page
			.locator('head script[type="application/ld+json"]')
			.allTextContents();
		const hasWebsite = ldJsonTexts.some((txt) => {
			try {
				const obj = JSON.parse(txt);
				return obj['@type'] === 'WebSite';
			} catch {
				return false;
			}
		});
		expect(hasWebsite).toBeTruthy();

		// JSON-LD Organization present
		const hasOrg = ldJsonTexts.some((txt) => {
			try {
				const obj = JSON.parse(txt);
				return obj['@type'] === 'Organization';
			} catch {
				return false;
			}
		});
		expect(hasOrg).toBeTruthy();

		// og:locale and alternates
		await expect(page.locator('head meta[property="og:locale"]').first()).toHaveCount(1);
		const altLocales = await page.locator('head meta[property="og:locale:alternate"]').count();
		expect(altLocales).toBeGreaterThan(0);

		// RSS link present
		await expect(
			page.locator('head link[rel="alternate"][type="application/rss+xml"]').first()
		).toHaveCount(1);
	});

	test('a post page exposes BlogPosting JSON-LD and OG meta', async ({ page, baseURL }) => {
		// Choose a known base-locale post path (ko-kr content is served at root without prefix)
		const url = baseURL + '/posts/development/web/cookies';
		await page.goto(url);

		// og:title/description/url present
		await expect(page.locator('head meta[property="og:title"]')).toHaveCount(1);
		await expect(page.locator('head meta[property="og:description"]')).toHaveCount(1);
		const ogUrl = await page.locator('head meta[property="og:url"]').getAttribute('content');
		expect(ogUrl).toMatch(/\/posts\/development\/web\/cookies$/); // Check the path ending

		// BlogPosting JSON-LD present + BreadcrumbList
		const ldJsonTexts = await page
			.locator('head script[type="application/ld+json"]')
			.allTextContents();
		const hasBlogPosting = ldJsonTexts.some((txt) => {
			try {
				const obj = JSON.parse(txt);
				return obj['@type'] === 'BlogPosting';
			} catch {
				return false;
			}
		});
		expect(hasBlogPosting).toBeTruthy();

		const hasBreadcrumbs = ldJsonTexts.some((txt) => {
			try {
				const obj = JSON.parse(txt);
				return obj['@type'] === 'BreadcrumbList';
			} catch {
				return false;
			}
		});
		expect(hasBreadcrumbs).toBeTruthy();
	});
});
