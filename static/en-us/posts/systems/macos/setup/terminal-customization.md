---
title: Terminal Customization Guide
authors:
  - XIYO
tags:
  - mac-setup
  - terminal
  - oh-my-zsh
  - powerlevel10k
  - iterm2
  - zsh
modifiedAt: 2025-07-27T21:08:36+09:00
createdAt: 2025-07-22T02:44:08+09:00
---

# Terminal Customization Guide

> [!NOTE]
> **Prerequisites**
> [Installing Essential Developer Tools](macos-step01-essential-developer-tools) must be completed.

## What is Oh My Zsh?

Oh My Zsh is a tool that makes your terminal prettier and more convenient.
It provides auto-completion when typing commands, displays with color coding, and lets you see Git information at a glance.

> [!INFO]
> **Features provided by Oh My Zsh**
> 
> - **Themes**: Changes the appearance and colors of the terminal
> - **Plugins**: Adds convenience features like auto-completion and syntax highlighting
> - **Aliases**: Shortens long commands for easier use
> - **Git Info**: Shows current branch and status in the prompt

## Installing Oh My Zsh

Open Terminal and copy-paste the following command:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

For questions during installation, enter **Y**:

- "Do you want to change your default shell to zsh?" → Enter **Y**

> [!INFO]
> **What happens automatically after installation**
> 
> 1. Existing `.zshrc` file is backed up to `.zshrc.pre-oh-my-zsh`
> 2. A new `.zshrc` file is created to activate Oh My Zsh
> 3. The default theme is applied, changing the terminal appearance

## Installing Themes and Plugins

Now that Oh My Zsh is installed, let's install more attractive themes and useful plugins.

### Components to Install

- **Powerlevel10k**: Most popular terminal theme (fast and pretty)
- **zsh-autosuggestions**: Shows previously typed commands in gray as suggestions
- **zsh-syntax-highlighting**: Shows correct commands in green, incorrect commands in red

### Install Powerlevel10k Theme

Open Terminal and copy-paste the following command:

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

### Install zsh-autosuggestions Plugin

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### Install zsh-syntax-highlighting Plugin

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### Update Configuration File

Update settings to activate the installed theme and plugins:

```bash
# Change theme
sed -i '' 's/ZSH_THEME=".*"/ZSH_THEME="powerlevel10k\/powerlevel10k"/' ~/.zshrc

# Activate plugins 
sed -i '' 's/plugins=(.*)/plugins=(git docker docker-compose zsh-autosuggestions zsh-syntax-highlighting)/' ~/.zshrc

# Apply settings
source ~/.zshrc
```

> [!INFO]
> **Activated plugins**
> 
> - **git**: Git-related aliases and information display
> - **docker**: Docker command auto-completion
> - **docker-compose**: Docker Compose auto-completion
> - **zsh-autosuggestions**: Command suggestion feature
> - **zsh-syntax-highlighting**: Command syntax highlighting


## Changing iTerm2 Color Theme

Want to make your terminal even prettier? Try changing the color theme.

> [!INFO]
> **What is a color theme?**
> 
> A combination of colors that changes the overall background, text, and highlight colors of the terminal.
> iTerm2 has built-in themes, and you can download additional ones.

### Change to Built-in Themes

First, check the themes built into iTerm2:

1. **iTerm2 → Settings → Profiles → Colors**
2. Click **"Color Presets..."** dropdown in bottom right
3. Available default themes include:
   - **Dark Background** (default dark theme)
   - **Light Background** (light theme)
   - **Pastel (Dark Background)** (pastel colors)
   - **Solarized Dark** (popular dark theme)
   - **Solarized Light** (popular light theme)
   - **Tango Dark** / **Tango Light**
4. Click desired theme to apply immediately

### Install More Themes

If you don't like the default themes, you can download hundreds of additional themes.

#### Popular Theme Recommendations

- **Dracula**: Popular dark purple theme
- **Tokyo Night**: Modern dark theme  
- **Gruvbox Dark**: Retro theme with warm colors
- **Catppuccin**: Soft pastel tone theme
- **Nord**: Minimal theme with cool blue tones

#### Download and Install Additional Themes

1. Visit [iTerm2 Color Schemes](https://iterm2colorschemes.com) website
2. Check theme previews
3. **Right-click** theme name link → Select **"Save Link As..."** to download `.itermcolors` file
4. Return to iTerm2:
   - **Settings → Profiles → Colors**
   - Click **"Color Presets..."** → **"Import..."**
   - Select downloaded `.itermcolors` file
   - Select imported theme from **"Color Presets..."** to apply

> [!INFO]
> **Downloaded theme files can be deleted**
> 
> Once you import a theme into iTerm2, the settings are copied and saved,
> so you can delete the `.itermcolors` files in your Downloads folder.

> [!TIP]
> **Theme Selection Tips**
> 
> - Dark themes are easier on the eyes for long coding sessions

## Powerlevel10k Configuration Wizard

When you restart the terminal, the Powerlevel10k configuration wizard starts automatically.

### MesloLGS NF Font Installation Notice

Before the configuration wizard starts, a screen appears recommending MesloLGS NF font installation:

> [!IMPORTANT]
> **Powerlevel10k Font Installation Process**
> 
> 1. When **"Install Meslo Nerd Font?"** question appears → Enter **y**
> 2. Powerlevel10k automatically downloads and installs MesloLGS NF font
> 3. **iTerm2 settings are also automatically changed** (font changes to MesloLGS NF)
> 
> This font is optimized for Powerlevel10k, but Korean characters might not display well.

### Configuration Wizard Progress

> [!INFO]
> **What is the configuration wizard?**
> 
> Powerlevel10k creates a prompt style tailored to your preferences through various questions.
> You can choose icon support, color style, information display method, etc.

### Recommended Settings (For Beginners)

It's recommended to select the following for each question:

- **Diamond** → **y** (y if you see diamond icon)
- **Lock** → **y** (y if you see lock icon)  
- **Debian** → **y** (y if you see Debian logo)
- **Style** → **3 (Rainbow)** (most popular colorful style)
- **Character Set** → **1 (Unicode)** (use Unicode characters)
- **Prompt Style** → **3 (Pure)** (clean 2-line style)
- **Transient Prompt** → **n** (keep default)
- **Instant Prompt** → **1 (Verbose)** (fast start)

### Change Back to Korean Font

After Powerlevel10k configuration, iTerm2 font will be changed to MesloLGS NF.
To properly display Korean, you need to change back to D2Coding Nerd Font:

1. **iTerm2 → Settings** (or `Cmd + ,`)
2. Select **Profiles → Text** tab
3. Confirm current font is "MesloLGS NF" in **Font** section
4. Click **Change Font**
5. Select **"D2CodingLigature Nerd Font"**
6. Size **14pt** recommended

> [!INFO]
> **Why set font twice?**
> 
> - **MesloLGS NF**: Font recommended by Powerlevel10k, displays all icons perfectly but not optimized for Korean
> - **D2Coding Nerd Font**: Font for Korean developers that displays Korean, English, and icons well
> 
> It's best to use MesloLGS NF during Powerlevel10k setup and switch to D2Coding afterwards.

> [!TIP]
> If you made a mistake or want to change later, you can always reconfigure:
> 
> ```bash
> p10k configure
> ```

## Verify Installation

Let's check if everything is installed correctly.

Open Terminal and copy-paste the following command:

```bash
echo $ZSH_THEME  # Should output powerlevel10k/powerlevel10k
echo $SHELL      # Should output /bin/zsh
```

### Verification Points for Successful Installation

1. **Terminal Prompt**: Shows Git branch name, folder icons, etc.
2. **Auto-completion**: Gray text suggestions appear when typing commands  
3. **Syntax Highlighting**: Correct commands in green, incorrect commands in red
4. **Icons**: Nerd Font icons display properly without breaking

## Additional Tips

### Useful Oh My Zsh Aliases

Convenient shortcut commands provided by Oh My Zsh:

- `ll` - `ls -l` (detailed file list)
- `la` - `ls -la` (list including hidden files)
- `..` - `cd ..` (go to parent folder)
- `...` - `cd ../..` (go up two levels)
- `gst` - `git status` (check Git status)
- `gaa` - `git add --all` (add all changes)
- `gcmsg` - `git commit -m` (commit with message)

### Powerlevel10k Advanced Settings

If you want more settings, you can edit the `~/.p10k.zsh` file:

```bash
# Edit configuration file
code ~/.p10k.zsh  # Open with VS Code
```

> It's recommended to just use default settings at first. 
> Try customizing after becoming familiar with the terminal!

[Go Back](macos-step01-essential-developer-tools)
