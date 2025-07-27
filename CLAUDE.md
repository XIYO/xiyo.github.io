---
title: CLAUDE.md
description: This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
authors:
  - XIYO
dates:
  - '2025-07-20T09:40:47.994Z'
messages:
  - ✨ 새로운 prepare-commit-msg 방식 테스트
created: '2025-07-20T09:40:47.994Z'
modified: '2025-07-20T09:40:47.994Z'
---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is xiyo.dev, a personal development blog built with SvelteKit and deployed to Cloudflare Workers. The blog supports multiple languages (Korean as default, English, and Japanese) and features automated content processing.

## Essential Development Commands

### Daily Development

```bash
pnpm dev          # Start dev server (auto-opens browser)
pnpm check        # Run type checking
pnpm lint         # Check code formatting and ESLint
pnpm format       # Auto-format code
```

### Testing

```bash
pnpm test         # Run all tests (unit → build → e2e)
pnpm test:unit    # Run unit tests only
pnpm test:e2e     # Run E2E tests only
```

### Building & Deployment

```bash
pnpm build        # Build for production
pnpm preview      # Preview production build locally
pnpm deploy       # Deploy to Cloudflare Workers
```


## Architecture & Key Patterns

### Tech Stack

- **Framework**: SvelteKit with Cloudflare adapter
- **Language**: JavaScript with JSDoc type checking
- **Styling**: Tailwind CSS v4
- **i18n**: Paraglide.js (compile-time)
- **Testing**: Vitest (unit), Playwright (e2e)

### Project Structure

```
src/
├── routes/
│   ├── (main)/          # Main layout group with header
│   │   └── [...slug]/   # Dynamic content routing
│   └── (no-header)/     # Layout without header
├── lib/
│   ├── components/ui/   # Reusable UI components
│   ├── post/           # Post processing logic
│   └── plugin/         # Markdown plugins
static/
├── posts/              # Markdown blog posts
│   ├── en-us/         # English translations
│   └── ja-jp/         # Japanese translations
scripts/                # Automation scripts
```

### Content Management

- Blog posts are markdown files in `/static/posts/`
- Multi-language posts in `en-us/` and `ja-jp/` subdirectories
- Frontmatter is automatically updated from git history via post-commit hook
- Custom markdown processing with Shiki syntax highlighting

### i18n Strategy

- Base language: Korean
- Additional languages: English, Japanese
- Messages in `/src/lib/paraglide/messages/`
- URL-based locale detection with cookie fallback

### Testing Approach

- Unit tests in `/tests/` directory
- E2E tests in `/e2e/` directory
- Run tests before committing major changes
- Test execution order: unit → build → e2e

### Vitest Browser Testing Guide

#### Why Browser Mode?

- **Real Browser Environment**: Tests run in actual browsers, not simulated environments like jsdom
- **Accurate Results**: Catch discrepancies that only appear in real browsers
- **Native Browser APIs**: Direct access to all browser features without limitations

#### Configuration

##### Basic Setup

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		browser: {
			enabled: true,
			provider: 'playwright', // 'playwright' | 'webdriverio' | 'preview'
			headless: true, // Run without visible browser (CI-friendly)
			isolate: true, // Each test in separate iframe
			instances: [{ browser: 'chromium' }]
		}
	}
});
```

##### Multiple Browser Testing

```javascript
test: {
  browser: {
    enabled: true,
    provider: 'playwright',
    instances: [
      { browser: 'chromium' },
      { browser: 'firefox' },
      { browser: 'webkit' }
    ]
  }
}
```

##### Advanced Configuration

```javascript
test: {
  browser: {
    enabled: true,
    provider: 'playwright',
    viewport: { width: 1280, height: 720 },  // Default viewport size
    ui: false,                                // Disable Vitest UI in CI
    instances: [
      {
        browser: 'chromium',
        launch: {                             // Playwright launch options
          slowMo: 100,
          devtools: true
        },
        context: {                            // Browser context options
          ignoreHTTPSErrors: true,
          permissions: ['clipboard-read']
        }
      }
    ]
  }
}
```

#### Context API

All browser testing utilities are imported from `@vitest/browser/context`:

```javascript
import {
	userEvent, // User interactions
	page, // Page utilities
	commands, // Custom commands
	cdp, // Chrome DevTools Protocol (Playwright + Chromium only)
	server // Server-side info
} from '@vitest/browser/context';
```

#### Locators API

##### Finding Elements

```javascript
// By ARIA role
const button = page.getByRole('button', { name: 'Submit' });
const heading = page.getByRole('heading', { level: 1 });

// By text content
const element = page.getByText('Welcome');
const partial = page.getByText(/welcome/i);

// By label
const input = page.getByLabelText('Email Address');

// By placeholder
const search = page.getByPlaceholder('Search...');

// By test ID
const modal = page.getByTestId('modal-container');

// By title attribute
const tooltip = page.getByTitle('More information');

// By alt text
const image = page.getByAltText('Company logo');
```

##### Chaining and Filtering

```javascript
// Get specific element from multiple matches
page.getByRole('button').first();
page.getByRole('listitem').nth(2);
page.getByRole('listitem').last();

// Combine locators
const submitButton = page.getByRole('form').getByRole('button', { name: 'Submit' });

// Filter with additional criteria
page.getByRole('button').filter({ hasText: 'Save' });
```

#### Interactivity API

##### User Actions

```javascript
import { userEvent } from '@vitest/browser/context';

// Click actions
await userEvent.click(element);
await userEvent.dblClick(element);
await userEvent.tripleClick(element);

// Mouse actions
await userEvent.hover(element);
await userEvent.unhover(element);

// Keyboard input
await userEvent.type(input, 'Hello World');
await userEvent.keyboard('{Shift>}A{/Shift}'); // Shift+A
await userEvent.keyboard('{Control>}a{/Control}{Delete}'); // Select all + Delete

// Form interactions
await userEvent.fill(input, 'new value'); // Set value directly
await userEvent.clear(input); // Clear input
await userEvent.selectOptions(select, ['option1', 'option2']);

// File upload
await userEvent.upload(fileInput, files);

// Drag and drop
await userEvent.dragAndDrop(source, target);

// Clipboard
await userEvent.copy();
await userEvent.cut();
await userEvent.paste();
```

##### Keyboard Syntax

```javascript
// Special keys
'{Enter}', '{Tab}', '{Escape}', '{Space}'
'{ArrowUp}', '{ArrowDown}', '{ArrowLeft}', '{ArrowRight}'
'{Home}', '{End}', '{PageUp}', '{PageDown}'
'{Delete}', '{Backspace}'

// Modifiers (use > for press, / for release)
'{Control>}a{/Control}'   // Ctrl+A
'{Shift>}hello{/Shift}'   // HELLO
'{Alt>}{F4}{/Alt}'        // Alt+F4

// Function keys
'{F1}' through '{F12}'
```

#### Assertion API

##### Element Assertions

```javascript
// Visibility
await expect.element(button).toBeVisible();
await expect.element(modal).not.toBeVisible();

// State
await expect.element(button).toBeEnabled();
await expect.element(button).toBeDisabled();
await expect.element(checkbox).toBeChecked();

// Content
await expect.element(heading).toHaveTextContent('Welcome');
await expect.element(heading).toHaveTextContent(/welcome/i);
await expect.element(input).toHaveValue('user@example.com');

// Attributes
await expect.element(link).toHaveAttribute('href', '/home');
await expect.element(div).toHaveClass('active');
await expect.element(div).toHaveStyle({ color: 'red' });

// Accessibility
await expect.element(button).toHaveRole('button');
await expect.element(input).toHaveAccessibleName('Email');
await expect.element(input).toHaveAccessibleDescription('Enter your email');

// Form validation
await expect.element(form).toHaveFormValues({
	username: 'john',
	password: '12345'
});
await expect.element(input).toBeRequired();
await expect.element(input).toBeValid();
```

##### Retry Mechanism

All element assertions automatically retry for better async handling:

```javascript
// Will retry until element appears or timeout
await expect.element(page.getByText('Loading...')).not.toBeVisible();
await expect.element(page.getByText('Success!')).toBeVisible();

// Custom timeout
await expect.element(modal).toBeVisible({ timeout: 10000 }); // 10 seconds
```

#### Commands API

##### Built-in Commands

```javascript
import { commands } from '@vitest/browser/context';

// File operations
const content = await commands.readFile('./data.json');
await commands.writeFile('./output.txt', 'Hello World');
await commands.removeFile('./temp.txt');

// CDP access (Playwright + Chromium only)
if (cdp) {
	await cdp.send('Emulation.setDeviceMetricsOverride', {
		width: 375,
		height: 667,
		mobile: true,
		deviceScaleFactor: 2
	});
}
```

##### Custom Commands

```javascript
// Define custom command
const takeScreenshot: BrowserCommand<[name: string]> = async (
  { provider, testPath },
  name
) => {
  if (provider.name === 'playwright') {
    const page = provider.page
    await page.screenshot({ path: `screenshots/${name}.png` })
  }
}

// Register in config
export default defineConfig({
  test: {
    browser: {
      commands: {
        takeScreenshot
      }
    }
  }
})

// Use in tests
await commands.takeScreenshot('homepage')
```

#### Testing Patterns

##### Component Testing

```javascript
test('interactive component', async () => {
	// Render component (framework-specific)
	render(MyComponent);

	// Interact
	const input = page.getByRole('textbox', { name: 'Name' });
	await userEvent.type(input, 'John Doe');

	const submit = page.getByRole('button', { name: 'Submit' });
	await userEvent.click(submit);

	// Assert
	await expect.element(page.getByText('Hello, John Doe!')).toBeVisible();
});
```

##### Form Testing

```javascript
test('form validation', async () => {
	const emailInput = page.getByLabelText('Email');
	const passwordInput = page.getByLabelText('Password');
	const submitButton = page.getByRole('button', { name: 'Login' });

	// Test empty submission
	await userEvent.click(submitButton);
	await expect.element(page.getByText('Email is required')).toBeVisible();

	// Test invalid email
	await userEvent.type(emailInput, 'invalid-email');
	await userEvent.click(submitButton);
	await expect.element(page.getByText('Invalid email format')).toBeVisible();

	// Test successful submission
	await userEvent.clear(emailInput);
	await userEvent.type(emailInput, 'user@example.com');
	await userEvent.type(passwordInput, 'password123');
	await userEvent.click(submitButton);

	await expect.element(page.getByText('Login successful')).toBeVisible();
});
```

##### Async Operations

```javascript
test('async data loading', async () => {
	// Initial state
	await expect.element(page.getByText('Loading...')).toBeVisible();

	// Wait for data
	await expect.element(page.getByText('Loading...')).not.toBeVisible();
	await expect.element(page.getByRole('list')).toBeVisible();

	// Verify data
	const items = page.getByRole('listitem');
	await expect.element(items.first()).toHaveTextContent('Item 1');
});
```

#### TypeScript Support

```typescript
// Add to test files for proper types
/// <reference types="@vitest/browser/providers/playwright" />

import { expect, test } from 'vitest';
import { page, userEvent } from '@vitest/browser/context';

// Now you have full TypeScript support
```

#### Common Issues and Solutions

1. **Navigation in Tests**

   ```javascript
   // ❌ BAD - Direct navigation breaks test isolation
   window.location.href = '/other-page';

   // ✅ GOOD - Test pages in isolation
   test('page 1', async () => {
   	/* test page 1 */
   });
   test('page 2', async () => {
   	/* test page 2 */
   });
   ```

2. **Timing Issues**

   ```javascript
   // ❌ BAD - Fixed delays
   await new Promise((resolve) => setTimeout(resolve, 2000));

   // ✅ GOOD - Wait for specific conditions
   await expect.element(page.getByText('Loaded')).toBeVisible();
   ```

3. **Global State**

   ```javascript
   // ❌ BAD - Tests affect each other
   let globalCounter = 0;

   // ✅ GOOD - Isolated test state
   test('isolated test', async () => {
   	const localCounter = 0;
   	// ...
   });
   ```

4. **Browser Dialogs**

   ```javascript
   // ❌ BAD - Blocking dialogs
   alert('This will block the test');

   // ✅ GOOD - Use assertions or custom UI
   await expect.element(page.getByText('Alert message')).toBeVisible();
   ```

#### Performance Tips

1. **Use Headless Mode in CI**: Faster and more reliable
2. **Parallelize Tests**: Run multiple browser instances
3. **Reuse Context**: Share browser context for related tests
4. **Minimize Waits**: Use assertions instead of fixed delays
5. **Selective Testing**: Use `--project` flag to test specific browsers

#### Best Practices

1. **Semantic Locators**: Prefer role/label over CSS selectors
2. **Explicit Waits**: Use retry-able assertions for async behavior
3. **Test Isolation**: Each test should be independent
4. **Meaningful Names**: Use descriptive test and element names
5. **Error Messages**: Include context in assertions
6. **Accessibility**: Test with accessibility in mind

### Code Style

- Prettier configured with:
  - Tabs for indentation
  - Single quotes
  - No trailing commas
- ESLint with flat config format
- Format on save recommended

### Deployment

- Deployed to Cloudflare Workers
- Uses Workers Assets for static files
- Configuration in `wrangler.toml`
- Observability enabled (10% sampling)

### Important Notes

1. Always run `pnpm check` before committing TypeScript changes
2. Markdown frontmatter updates automatically on commit
3. Use existing UI components from `/src/lib/components/ui/`
4. Follow existing routing patterns for new pages
5. Test i18n changes in all three languages
