import { test, expect } from '@playwright/test';

test.describe('Main page internationalization', () => {
	test('should display correct content in Korean (default)', async ({ page }) => {
		await page.goto('/');

		// Check page title
		await expect(page).toHaveTitle('이요의 홀');

		// Check main heading
		const heading = page.locator('h1');
		await expect(heading).toHaveText('이요의 홀');

		// Check main content
		const mainContent = page.locator('p').first();
		await expect(mainContent).toContainText(
			'웹을 사랑하는 개발자입니다. 접근성과 국제화를 중요하게 생각하며, 모두가 편하게 사용할 수 있는 웹을 목표로 합니다.'
		);

		// Check figure caption
		const figureCaption = page.locator('figcaption');
		await expect(figureCaption).toHaveText('터미널에서 w3m을 이용하여 접속하였습니다.');

		// Check image alt text
		const image = page.locator('figure img');
		await expect(image).toHaveAttribute('alt', '터미널 브라우저에서 접속한 화면');
	});

	test('should display correct content in English', async ({ page }) => {
		await page.goto('/en-US');

		// Check page title
		await expect(page).toHaveTitle("XIYO's Hole");

		// Check main heading
		const heading = page.locator('h1');
		await expect(heading).toHaveText("XIYO's Hole");

		// Check main content
		const mainContent = page.locator('p').first();
		await expect(mainContent).toContainText(
			'I am a developer who loves the web. I consider accessibility and internationalization important, and aim for a web that everyone can use comfortably.'
		);

		// Check figure caption
		const figureCaption = page.locator('figcaption');
		await expect(figureCaption).toHaveText('Accessed using w3m from the terminal.');

		// Check image alt text
		const image = page.locator('figure img');
		await expect(image).toHaveAttribute('alt', 'Screen accessed from terminal browser');
	});

	test('should display correct content in Japanese', async ({ page }) => {
		await page.goto('/ja-JP');

		// Check page title
		await expect(page).toHaveTitle('イヨのホール');

		// Check main heading
		const heading = page.locator('h1');
		await expect(heading).toHaveText('イヨのホール');

		// Check main content
		const mainContent = page.locator('p').first();
		await expect(mainContent).toContainText(
			'ウェブを愛する開発者です。アクセシビリティと国際化を大切に考え、誰もが快適に使えるウェブを目指しています。'
		);

		// Check figure caption
		const figureCaption = page.locator('figcaption');
		await expect(figureCaption).toHaveText('ターミナルからw3mを使用してアクセスしました。');

		// Check image alt text
		const image = page.locator('figure img');
		await expect(image).toHaveAttribute('alt', '端末ブラウザから接続した画面');
	});

	test('should switch languages correctly via navigation', async ({ page }) => {
		// Start with Korean
		await page.goto('/');
		await expect(page).toHaveTitle('이요의 홀');

		// Navigate to nav page directly via URL
		await page.goto('/nav');

		// Switch to English
		await page.click('text=en-US');
		await expect(page).toHaveURL(/.*\/en-US\/nav/);

		// Go to English home page
		await page.goto('/en-US');

		// Verify English content
		await expect(page).toHaveTitle("XIYO's Hole");
		const figureCaption = page.locator('figcaption');
		await expect(figureCaption).toHaveText('Accessed using w3m from the terminal.');

		// Navigate to nav page for language switch
		await page.goto('/en-US/nav');

		// Switch to Japanese
		await page.click('text=ja-JP');
		await expect(page).toHaveURL(/.*\/ja-JP\/nav/);

		// Go to Japanese home page
		await page.goto('/ja-JP');

		// Verify Japanese content
		await expect(page).toHaveTitle('イヨのホール');
		const figureCaptionJP = page.locator('figcaption');
		await expect(figureCaptionJP).toHaveText('ターミナルからw3mを使用してアクセスしました。');
	});
});
