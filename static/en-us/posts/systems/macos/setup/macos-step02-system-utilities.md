---
title: Installing System Utilities
authors:
  - XIYO
tags:
  - mac-setup
  - productivity
  - slack
  - notion
  - obsidian
  - chrome
  - rectangle
lastModified: 2025-07-27T21:08:36+09:00
published: 2025-07-23T00:45:09+09:00
---

# Installing System Utilities

> [!NOTE]
> **Prerequisites**
> [Homebrew installation](macos-step00-homebrew-installation) must be completed before proceeding with this guide.

## Install All Productivity Tools at Once

Install essential tools for development and collaboration.

Open Terminal and copy-paste the following command:

```bash
(brew install --cask slack || true) && \
(brew install --cask notion || true) && \
(brew install --cask obsidian || true) && \
(brew install --cask google-chrome || true) && \
(brew install --cask rectangle || true) && \
echo "All productivity tools installed!"
```

> Honestly, just trust me and install them.
> These are tools you absolutely need.

## Installed Tool Descriptions

### Collaboration & Communication

- **Slack** - Messenger for team communication and collaboration. Essential for development teams
- **Notion** - All-in-one workspace. Documents, databases, project management, etc.

### Notes & Documentation

- **Obsidian** - Powerful markdown-based note-taking app. Perfect for development documentation and note management

### Web Browser

- **Google Chrome** - Web browser with powerful developer tools. Essential for web development

### Window Management

- **Rectangle** - Free tool for adjusting window size and position with keyboard shortcuts
  - `Ctrl + Option + ←/→`: Take up half the screen
  - `Ctrl + Option + ↑`: Full screen
  - `Ctrl + Option + ↓`: Center window

## Additional Recommended Tools

Install selectively based on your development style.

## Initial Setup for Each Tool

### Rectangle Setup

1. Launch Rectangle
2. Allow accessibility permissions
3. Check "Launch on login" in Preferences
4. Customize shortcuts as needed

### Chrome Setup

1. Launch Chrome and set as default browser
2. Check developer tools shortcut: `Cmd + Option + I`

### Slack Setup

1. Add workspace
2. Customize notification settings
3. Set dark mode (if preferred)

### Obsidian Web Clipper Setup

Extension that allows you to save web pages directly to Obsidian.

#### Install for Chrome

1. Search for "Obsidian Web Clipper" in Chrome Web Store
2. Or install directly: [Obsidian Web Clipper - Chrome](https://chromewebstore.google.com/detail/obsidian-web-clipper/mphkdfmipddgfobjhphabphmpdckgfhb)
3. Add extension and set Obsidian vault path

#### Install for Safari

1. Search for "Obsidian Clipper for Safari" in Mac App Store
2. Or install directly: [Obsidian Clipper - Safari](https://apps.apple.com/app/obsidian-clipper-for-safari/id1640358805)
3. Enable in Safari → Settings → Extensions
4. Set Obsidian vault path

> [!TIP]
> Shortcut settings: Chrome uses `Cmd + Shift + O`, Safari shortcuts can be configured in extension settings

## Next Steps

System utilities installation is complete. Next, set up development environments for programming languages.

[Next Step: Installing Programming Languages](macos-step03-programming-languages)
