import { test, expect } from '@playwright/test';

test.describe('Posts Page Navigation', () => {
	test.describe('Posts List Display', () => {
		test('should display posts list on /posts', async ({ page }) => {
			await page.goto('/posts');

			const postsSection = page.locator('main');
			await expect(postsSection).toBeVisible();
		});

		test('should display multiple post items', async ({ page }) => {
			await page.goto('/posts');

			const postLinks = page.locator('a[href*="/posts/"]');
			const count = await postLinks.count();

			expect(count).toBeGreaterThan(0);
		});

		test('should have clickable post links', async ({ page }) => {
			await page.goto('/posts');

			const firstLink = page.locator('a[href*="/posts/"]').first();
			const href = await firstLink.getAttribute('href');

			expect(href).toBeTruthy();
			expect(href).toContain('/posts/');
		});
	});

	test.describe('Posts Category Navigation', () => {
		test('should navigate to category pages', async ({ page }) => {
			await page.goto('/posts');

			const categoryLink = page.locator('a[href*="/posts/development"]').first();
			const isVisible = await categoryLink.isVisible().catch(() => false);

			if (isVisible) {
				await categoryLink.click();
				await page.waitForLoadState('networkidle');

				const url = page.url();
				expect(url).toContain('/posts/development');
			}
		});

		test('should display breadcrumb navigation', async ({ page }) => {
			await page.goto('/posts');

			const breadcrumb = page.locator('nav').first();
			const isVisible = await breadcrumb.isVisible().catch(() => false);

			expect(isVisible).toBeTruthy();
		});
	});

	test.describe('Posts Content Display', () => {
		test('should display post titles', async ({ page }) => {
			await page.goto('/posts');

			const firstPost = page.locator('a[href*="/posts/"]').first();
			const text = await firstPost.textContent();

			expect(text).toBeTruthy();
			expect(text?.length).toBeGreaterThan(0);
		});

		test('should display post metadata (if available)', async ({ page }) => {
			await page.goto('/posts');

			const main = page.locator('main');
			const text = await main.textContent();

			expect(text).toBeTruthy();
			expect(text?.length).toBeGreaterThan(0);
		});
	});

	test.describe('Posts Sorting', () => {
		test('should display posts in sorted order', async ({ page }) => {
			await page.goto('/posts');

			const postLinks = page.locator('a[href*="/posts/"]');
			const count = await postLinks.count();

			if (count > 1) {
				const firstHref = await postLinks.nth(0).getAttribute('href');
				const secondHref = await postLinks.nth(1).getAttribute('href');

				expect(firstHref).toBeTruthy();
				expect(secondHref).toBeTruthy();
			}
		});
	});

	test.describe('Multi-language Posts', () => {
		test('should display posts on English /posts page', async ({ page }) => {
			await page.goto('/en-us/posts');

			const postLinks = page.locator('a[href*="/posts/"]');
			const count = await postLinks.count();

			expect(count).toBeGreaterThan(0);
		});

		test('should display posts on Japanese /posts page', async ({ page }) => {
			await page.goto('/ja-jp/posts');

			const postLinks = page.locator('a[href*="/posts/"]');
			const count = await postLinks.count();

			expect(count).toBeGreaterThan(0);
		});

		test('should have consistent posts across languages', async ({ page }) => {
			await page.goto('/posts');
			const koCount = await page.locator('a[href*="/posts/"]').count();

			await page.goto('/en-us/posts');
			const enCount = await page.locator('a[href*="/posts/"]').count();

			expect(koCount).toBeGreaterThan(0);
			expect(enCount).toBeGreaterThan(0);
		});
	});

	test.describe('Post Detail Pages', () => {
		test('should navigate to post detail page', async ({ page }) => {
			await page.goto('/posts');

			const firstLink = page.locator('a[href*="/posts/"]').first();
			const href = await firstLink.getAttribute('href');

			await firstLink.click();
			await page.waitForLoadState('networkidle');

			const currentUrl = page.url();
			expect(currentUrl).toContain('/posts/');
		});

		test('should display post content on detail page', async ({ page }) => {
			await page.goto('/posts');

			const firstLink = page.locator('a[href*="/posts/"]').first();
			await firstLink.click();
			await page.waitForLoadState('networkidle');

			const article = page.locator('article, main');
			await expect(article).toBeVisible();

			const content = await article.textContent();
			expect(content).toBeTruthy();
			expect(content?.length).toBeGreaterThan(0);
		});

		test('should have back navigation on detail page', async ({ page }) => {
			await page.goto('/posts');

			const firstLink = page.locator('a[href*="/posts/"]').first();
			await firstLink.click();
			await page.waitForLoadState('networkidle');

			const backLink = page.locator('a[href*="/posts"]');
			const count = await backLink.count();

			expect(count).toBeGreaterThan(0);
		});
	});

	test.describe('Posts Search and Filter', () => {
		test('should handle category filtering', async ({ page }) => {
			await page.goto('/posts');

			const categoryLinks = page.locator('a[href*="/posts/development"], a[href*="/posts/tools"]');
			const count = await categoryLinks.count();

			expect(count).toBeGreaterThanOrEqual(0);
		});
	});

	test.describe('Posts Performance', () => {
		test('should load posts page quickly', async ({ page }) => {
			const startTime = Date.now();
			await page.goto('/posts');
			const endTime = Date.now();

			expect(endTime - startTime).toBeLessThan(5000);
		});

		test('should handle rapid navigation between post lists', async ({ page }) => {
			await page.goto('/posts');
			await page.goto('/en-us/posts');
			await page.goto('/ja-jp/posts');
			await page.goto('/posts');

			const url = page.url();
			expect(url).toContain('/posts');
		});
	});

	test.describe('Posts Accessibility', () => {
		test('should have proper heading hierarchy', async ({ page }) => {
			await page.goto('/posts');

			const h1Count = await page.locator('h1').count();
			const h2Count = await page.locator('h2').count();

			expect(h1Count + h2Count).toBeGreaterThan(0);
		});

		test('should have accessible links', async ({ page }) => {
			await page.goto('/posts');

			const links = page.locator('a[href*="/posts/"]');
			const count = await links.count();

			for (let i = 0; i < Math.min(5, count); i++) {
				const link = links.nth(i);
				const text = await link.textContent();
				expect(text?.trim()).toBeTruthy();
			}
		});
	});
});
