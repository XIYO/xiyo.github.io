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

### Component Development

```bash
pnpm storybook    # Start Storybook (port 6006)
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
│   ├── en-US/         # English translations
│   └── ja-JP/         # Japanese translations
scripts/                # Automation scripts
```

### Content Management

- Blog posts are markdown files in `/static/posts/`
- Multi-language posts in `en-US/` and `ja-JP/` subdirectories
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
