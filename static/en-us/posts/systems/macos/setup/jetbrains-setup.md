---
title: JetBrains Setup Guide
authors:
  - XIYO
tags:
  - mac-setup
  - jetbrains
  - intellij
  - ide
  - development-tools
  - font-settings
lastModified: 2025-07-27T21:08:36+09:00
published: 2025-07-22T02:44:08+09:00
---

# JetBrains Setup Guide

## What is JetBrains?

JetBrains is a Czech software development company known for creating IDEs (Integrated Development Environments) that maximize developer productivity.
They provide language-specific IDEs such as IntelliJ IDEA (Java), PyCharm (Python), WebStorm (JavaScript), GoLand (Go), and more.

It's one of the most preferred IDEs among developers worldwide, offering smart code completion, powerful debugging, and refactoring tools.

## What is JetBrains Toolbox?

JetBrains Toolbox is a desktop app that allows you to manage all JetBrains IDEs in one place.
Like an App Store, you can install, update, and remove IDEs, and manage multiple versions simultaneously.

### Why You Should Install with Toolbox

**Problems with standalone installation:**

- Must download and install each IDE individually
- Need to manually check and install updates
- Must manage licenses separately
- Complex multi-version management

**Benefits of using Toolbox:**

- Unified management of all IDEs in one place
- Automatic update support
- Use all IDEs with one license
- Different IDE versions per project possible
- Automatically generates shell scripts for running IDEs from terminal

## JetBrains Toolbox Initial Setup

### Launch Toolbox

Command to launch the JetBrains Toolbox app.

Open Terminal and copy-paste the following command:

```bash
open -a "JetBrains Toolbox"
```

> [!INFO]
> **macOS Security Approval Required**
>
> On first launch, a security dialog like "Do you want to allow JetBrains Toolbox to run?" will appear.
> Click "Open" to approve.

### Login

Log in with your JetBrains account. If you don't have an account, create one first at [JetBrains Account Creation](https://account.jetbrains.com/login).

## Installing IntelliJ IDEA Ultimate

IntelliJ IDEA is JetBrains' flagship Java IDE. There are two versions: Community (free) and Ultimate (paid):

- **Community Edition**: Provides basic Java development features (free)
- **Ultimate Edition**: Includes advanced features like web development, database, framework support (paid, free for students)

**Key features included in IntelliJ IDEA Ultimate:**

- **Web Development**: JavaScript, TypeScript, React, Vue.js, Angular support
- **Database**: All DataGrip features built-in (MySQL, PostgreSQL, MongoDB, etc.)
- **Frameworks**: Spring, Spring Boot, Hibernate, JPA support
- **Version Control**: Advanced Git, SVN, Mercurial features
- **Cloud**: Docker, Kubernetes, AWS, Google Cloud support
- **Testing**: Integrated JUnit, TestNG, Mockito support

With Ultimate alone, you can do everything from Java backend to React frontend and database work.

> They say the community version is free, but every feature you need is only in Ultimate, so it's better for your mental health not to use it... 🤒

### Installation

Find **IntelliJ IDEA Ultimate** in Toolbox and click Install.

### License Activation

You need a license to use IntelliJ IDEA Ultimate. There are three options:

#### 30-Day Free Trial

- Use immediately for 30 days without separate application
- All features available during trial period

#### Student Free License

- Free use until graduation with student verification
- [JetBrains Student License Application](https://www.jetbrains.com/student/)
- Verify with school email or student ID

#### Paid Subscription

- **Individual**: $17/month / $169/year (1st year) → $135 (2nd year) → $101 (3rd year onwards)
- **Business**: $60/month / $599/year (per user)

> [!INFO]
> **Continuous Subscription Discount**
>
> JetBrains applies discounts for continuous subscriptions. Time used with student authentication
> is included in the usage period when converting to paid subscription later, allowing you to receive discount benefits.
>
> **Start with trial**: Recommended order is 30-day trial → Student license (free) → Paid subscription (with discount).

## IntelliJ Essential Shortcuts

Essential shortcuts that maximize IntelliJ's productivity. Just learning these will greatly improve development speed.

### Search Related (Most Important!)

- `Double Shift` - Search everything (files, classes, methods, settings, etc.)
- `Cmd + Shift + A` - Search all actions (find menus, features)
- `Cmd + Shift + F` - Search text in entire project
- `Cmd + F` - Search in current file
- `Cmd + R` - Replace in current file

### Files and Navigation

- `Cmd + E` - Recently opened files list
- `Cmd + Shift + E` - Recently edited files list
- `Cmd + O` - Go to class
- `Cmd + Shift + O` - Go to file
- `Cmd + Alt + O` - Go to symbol (method, variable)

### Code Editing

- `Cmd + D` - Duplicate current line
- `Cmd + X` - Cut current line (without selection)
- `Cmd + /` - Toggle single line comment
- `Cmd + Shift + /` - Toggle block comment
- `Alt + Up/Down` - Move by method
- `Cmd + Shift + Up/Down` - Move code block

### Run and Debug

- `Ctrl + R` - Run
- `Ctrl + D` - Debug run
- `F8` - Next line when debugging
- `F7` - Step into method when debugging
- `Shift + F8` - Step out of method when debugging

### Refactoring

- `Shift + F6` - Rename (variable, method, class)
- `Cmd + Alt + M` - Extract method
- `Cmd + Alt + V` - Extract variable
- `Cmd + Alt + L` - Format code

> [!TIP]
> **Shortcut Learning Tip**
>
> At first, just remember `Double Shift` and `Cmd + Shift + A`.
> With just these two, you can access all features and naturally learn other shortcuts as you use them.

## D2Coding Nerd Font Setup

> [!INFO]
> **D2Coding Nerd Font Pre-installation Check**
>
> D2Coding Nerd Font is a font that supports both Korean and developer icons.
> Since it was already installed in essential-developer-tools.md, just proceed with the settings.

### Editor Font Settings

In IntelliJ IDEA → Settings (`Cmd+,`) → Editor → Font, set as follows:

- Font: **D2CodingLigature Nerd Font**
- Size: **14** (recommended)
- Line height: **1.2**
- Enable ligatures: ON (improves code readability)

> [!INFO]
> **Nerd Font**: Fonts specially created for developers with thousands of icons added to regular fonts
> representing Git status, file types, directories, etc. File icons, branch indicators, etc. appear cleanly in terminal themes or IDEs.
>
> **Ligatures**: A feature that combines consecutive characters into a single symbol. For example, code like `=>`, `>=`, `!=`, `===`
> is displayed as more readable symbols like `⇒`, `≥`, `≠`, `≡`. Makes code meaning visually clearer.

### Terminal Font Settings

In Editor → Color Scheme → Console Font, set as follows:

- Check "Use console font instead of the default"
- Font: **D2CodingLigature Nerd Font**
- Size: **14**
- Line height: **1.2**

### Additional Terminal Settings

In Tools → Terminal, set as follows:

- Shell path: `/bin/zsh` (usually already set as macOS default)
- Environment variables: Add `TERM=xterm-256color`

> [!INFO]
> **Setting Item Explanation**
>
> **Shell path**: macOS uses zsh by default, so `/bin/zsh` is already set. It's the same regardless of Oh My Zsh installation.
>
> **Environment variables - TERM**: Defines the terminal's color support level. Setting to `xterm-256color` supports 256 colors,
> allowing terminal theme colors to display properly. Especially important for themes like Powerlevel10k.

## Opening Projects from Terminal

### Enable Shell Script

First, you need to enable shell script in JetBrains Toolbox:

1. Open **JetBrains Toolbox**
2. Click **Settings** icon in top right (⚙️)
3. **Settings** → **Tools** tab
4. Check **Generate shell scripts**
5. Verify **Shell scripts location** path (usually `/usr/local/bin`)

> [!INFO]
> **What is a Shell Script?**
>
> Shell Script is an executable file that allows you to run IDEs with commands like `idea .` from the terminal.
> JetBrains Toolbox generates them automatically and creates commands for all installed JetBrains IDEs.

After setup is complete, you can run IntelliJ directly from the terminal.

To open a project in the current location with IntelliJ, open Terminal and copy-paste the following command:

```bash
# Open current directory with IntelliJ
idea .
```

To open a project at a specific path, open Terminal and copy-paste the following command:

```bash
# Open specific project
idea ~/projects/my-project
```

[Go Back](macos-step01-essential-developer-tools)
