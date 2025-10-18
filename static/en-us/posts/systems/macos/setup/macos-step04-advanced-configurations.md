---
title: macOS Tips Collection
authors:
  - XIYO
tags:
  - mac-setup
  - macos-tips
  - shortcuts
  - productivity
  - screenshot
  - spotlight
modifiedAt: 2025-07-27T21:08:36+09:00
createdAt: 2025-07-23T00:45:09+09:00
---

# macOS Tips Collection

> [!NOTE]
> **macOS Features Developers Should Know**
> Introducing hidden features that help you use your Mac more efficiently.

## Screenshots & Screen Recording

### Basic Screenshot Shortcuts

- `Cmd + Shift + 3`: Capture entire screen
- `Cmd + Shift + 4`: Capture selected area
- `Cmd + Shift + 4 + Space`: Capture specific window

### Capture Window Without Shadow

After entering window capture mode with `Cmd + Shift + 4` → `Space`:

- **Hold Option key and click**: Capture without shadow
- **Just click**: Capture with shadow

> [!TIP]
> When you hold the Option key, the shadow preview around the window disappears.

### Screen Recording

Press `Cmd + Shift + 5` to show screenshot and screen recording tools:

- Record entire screen
- Record selected area
- Timer settings available
- Choose to include/exclude microphone audio

## Application Management

### Force Quit

When an app is not responding:

1. **Method 1**: `Cmd + Option + Esc` → Select app → Force Quit
2. **Method 2**: Hold Option key and right-click app icon in Dock → Force Quit
3. **Method 3**: Use Activity Monitor (`Cmd + Space` → "Activity Monitor")

### Quick App Quit

Press `Cmd + Option + Q` instead of `Cmd + Q` to quit immediately without confirmation.

## File Management Tips

### Show/Hide Hidden Files

In Finder, press `Cmd + Shift + .` (period) to toggle hidden files.

### Copy File Path

After selecting a file in Finder:

- `Option + Cmd + C`: Copy file path to clipboard

### Quick Look

Select a file and press `Space` to preview it.

- Code files are previewed with syntax highlighting
- Select multiple files and press Space for slideshow

## Text Editing Shortcuts

### Emacs-style Shortcuts

macOS supports Emacs shortcuts in all text input fields:

> [!INFO]
> **What is Emacs?**
> A text editor created in the 1970s with an efficient shortcut system for text editing. macOS supports these shortcuts system-wide.

- `Ctrl + A`: Go to beginning of line
- `Ctrl + E`: Go to end of line
- `Ctrl + K`: Delete from cursor to end of line
- `Ctrl + D`: Delete character to the right of cursor
- `Option + ←/→`: Move by word
- `Option + Delete`: Delete by word

### Special Character Input

Press `Ctrl + Cmd + Space` to open emoji & special character popup.

## Spotlight Search Usage

Open Spotlight with `Cmd + Space` and:

- Calculator: Direct calculations like `2+2`, `100*1.1`
- Unit conversion: `100cm in inches`, `32c in f`
- Search by file type: `kind:pdf`, `kind:image`
- Search by date: `created:today`, `modified:yesterday`

## Additional Tips

### Rename Multiple Files at Once

In Finder, select multiple files → Right-click → "Rename X Items..."

- Replace Text: Find and replace specific text
- Add Text: Add text before/after filename
- Format: Number sequentially

### Clipboard History

If you accidentally overwrite copied text:

- Many apps allow access to clipboard history with `Cmd + Shift + V`
- Or use launcher apps like Raycast/Alfred

### Window Minimize Shortcuts

`Cmd + M` to minimize current window to Dock
`Cmd + Option + M` to minimize all windows of current app

### Prevent Mac Sleep Mode (caffeinate)

When using Mac as a server or during long tasks to prevent sleep:

Open Terminal and copy-paste the following command:

```bash
# Basic usage (until Ctrl+C)
caffeinate

# Prevent sleep for 1 hour only
caffeinate -t 3600

# Prevent sleep while specific process runs
caffeinate -i npm run build
```

> [!TIP]
> `caffeinate -d` also prevents the display from turning off.

## Conclusion

> [!SUCCESS]
> Now you can use your Mac much more efficiently!
> Check back anytime if you get stuck while developing.
