---
title: Karabiner-Elements Setup Guide
description: >-
  Karabiner-Elements is a powerful tool that allows you to freely customize
  keyboard behavior on macOS. This guide covers the three most useful settings.
authors:
  - XIYO
tags:
  - mac-setup
  - karabiner
  - keyboard
  - productivity
modifiedAt: 2025-07-27T21:08:36+09:00
createdAt: 2025-07-22T02:44:08+09:00
---

# Karabiner-Elements Setup Guide

Karabiner-Elements is a powerful tool that allows you to freely customize keyboard behavior on macOS. This guide covers the three most useful settings.

## Installing Karabiner-Elements

Open Terminal and install with Homebrew:

```bash
brew install --cask karabiner-elements
```

After installation, you need to allow system permissions:
1. System Settings → Privacy & Security
2. Allow all Karabiner-related items in Input Monitoring

## Basic Setting: Improve Korean/English Toggle

### Change Right Command to Korean/English Key

The default Korean/English toggle (Caps Lock) in macOS has a delay which is inconvenient. Let's change the right Command key to Korean/English toggle.

Launch Karabiner-Elements and configure as follows:

1. Click **Simple Modifications** tab
2. Click **Add item** button
3. From key: `right_command` → To key: `f18`

Change the Korean/English toggle shortcut in macOS keyboard settings:

1. System Settings → Keyboard → Shortcuts → Input Sources
2. Click "Select the next source in Input menu"
3. Press right Command key (recognized as F18)

Now you can instantly toggle Korean/English with the right Command key.

## Installing Ultimate macOS

Ultimate macOS is a comprehensive package containing dozens of useful keyboard settings. Once installed, you can select and activate only the features you need.

### Installation Method

1. Launch Karabiner-Elements
2. Go to **Complex Modifications** tab
3. Click **Add rule** button
4. Click **Import more rules from the Internet**
5. Enter **"ultimate macOS"** in search box
6. Select **"ultimate macOS"** by suliveevil and click **Import**

### Vim-style Arrow Keys Setup (hjkl)

After installing Ultimate macOS, you can use various Vim-related settings.

#### Activate Vi Mode

1. Check Ultimate macOS rule list in Complex Modifications
2. Select one of the following and click **Enable**:
   - **"Vi Mode [Hold ⇪ Caps Lock for Vi Mode]"**: hjkl works as arrow keys only while holding Caps Lock
   - **"Vi Mode [⌃ Control + hjkl]"**: Use arrow keys with Control + hjkl
   - **"Vi Mode [fn + hjkl]"**: Use arrow keys with fn + hjkl

> [!TIP]
> **Recommended Setting**
> 
> "Hold ⇪ Caps Lock for Vi Mode" is the most practical.
> It only works while holding Caps Lock, so it doesn't interfere with normal typing.

#### Available Shortcuts

When Vi Mode is activated, you can use these features:

- **Basic Movement**
  - h: ← (left)
  - j: ↓ (down)
  - k: ↑ (up)
  - l: → (right)

- **Extended Movement** (supported in some modes)
  - w: Move to next word
  - b: Move to previous word
  - 0: Beginning of line
  - $: End of line

### Additional Useful Features

Ultimate macOS also includes these useful features:

#### Hyper Key Setup
Activate "⇪ Caps Lock → Hyper Key (⌃⌥⇧⌘)":
- Changes Caps Lock to a special modifier key
- Can create unique shortcuts that don't conflict with other apps

#### Settings for Korean Users
In "Korean" category:
- **"⇧ Shift + Space → Switch Input Source"**: Korean/English toggle with Shift+Space
- **"₩ → ` or ₩ (Hold ⌥ Option)"**: Change Won key to backtick

#### Settings for Developers
- **"⎋ Escape → ` ~ (Hold ⇧ Shift)"**: Input backtick with ESC key
- **"Delete Line/Word"**: Quick delete shortcuts
- **"Emacs Mode"**: Emacs-style shortcuts (Control+A/E etc.)

## Usage Tips

### Backup Settings
To backup your settings, save this file:
```bash
~/.config/karabiner/karabiner.json
```

### Troubleshooting
- If settings don't work, restart Karabiner-Elements
- Check if permissions are properly granted in System Settings
- Be aware of conflicts with other keyboard utilities

### Restore to Original
1. **Remove** activated rules in Complex Modifications
2. Delete settings in Simple Modifications
3. Uninstall Karabiner-Elements if needed:
   ```bash
   brew uninstall --cask karabiner-elements
   ```

> [!TIP]
> **Step-by-Step Approach**
> 
> 1. First try only the Korean/English toggle improvement
> 2. After installing Ultimate macOS, activate only Vi Mode
> 3. Add more features one by one as you get familiar

Now you can use your keyboard 200% more effectively!
