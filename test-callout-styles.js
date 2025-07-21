import { chromium } from 'playwright';

async function testCalloutStyles() {
	const browser = await chromium.launch({ headless: false });
	const context = await browser.newContext();
	const page = await context.newPage();

	try {
		// Navigate to test page
		await page.goto('http://localhost:5173/test-callouts');

		// Wait for page to load and check for callouts
		await page.waitForTimeout(2000);

		// Check for elements with data-callout attribute first
		const dataCalloutElements = await page.$$('[data-callout]');
		console.log(`Found ${dataCalloutElements.length} elements with data-callout attribute`);

		// Also check for .callout class elements
		const calloutElements = await page.$$('.callout');
		console.log(`Found ${calloutElements.length} elements with .callout class`);

		if (dataCalloutElements.length === 0 && calloutElements.length === 0) {
			console.log('No callout elements found. Checking page content...');
			const pageContent = await page.content();
			console.log('Page title:', await page.title());

			// Check if test page exists by looking for specific callout text
			const hasCalloutText =
				pageContent.includes('This is a note') || pageContent.includes('[!note]');
			console.log('Has callout text in HTML:', hasCalloutText);

			if (!hasCalloutText) {
				console.log('Test page may not exist or callouts not processed correctly');
				return;
			}
		}

		// Use either .callout elements or data-callout elements
		const callouts = calloutElements.length > 0 ? calloutElements : dataCalloutElements;
		console.log(`Using ${callouts.length} callout elements for style inspection`);

		// Check styles for each callout
		for (let i = 0; i < callouts.length; i++) {
			const callout = callouts[i];

			// Get computed styles
			const styles = await callout.evaluate((el) => {
				const computed = window.getComputedStyle(el);
				return {
					backgroundColor: computed.backgroundColor,
					borderRadius: computed.borderRadius,
					padding: computed.padding,
					margin: computed.margin,
					overflow: computed.overflow,
					width: computed.width,
					display: computed.display,
					// Get data-callout attribute
					dataCallout: el.getAttribute('data-callout')
				};
			});

			console.log(`\nCallout ${i + 1} [${styles.dataCallout}]:`);
			console.log('- Background:', styles.backgroundColor);
			console.log('- Border Radius:', styles.borderRadius);
			console.log('- Padding:', styles.padding);
			console.log('- Margin:', styles.margin);
			console.log('- Width:', styles.width);

			// Check title styles
			const title = await callout.$('.callout-title');
			if (title) {
				const titleStyles = await title.evaluate((el) => {
					const computed = window.getComputedStyle(el);
					return {
						color: computed.color,
						display: computed.display,
						gap: computed.gap,
						alignItems: computed.alignItems
					};
				});
				console.log('- Title Color:', titleStyles.color);
				console.log('- Title Display:', titleStyles.display);
				console.log('- Title Gap:', titleStyles.gap);
			}
		}

		// Take screenshot
		await page.screenshot({ path: 'callout-styles-test.png', fullPage: true });
		console.log('\nScreenshot saved as callout-styles-test.png');

		// Check if CSS file is loaded
		const cssFiles = await page.evaluate(() => {
			const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
			return links.map((link) => link.href);
		});

		console.log('\nLoaded CSS files:');
		cssFiles.forEach((file) => console.log('-', file));

		// Keep browser open for 5 seconds to visually inspect
		await page.waitForTimeout(5000);
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await browser.close();
	}
}

testCalloutStyles();
