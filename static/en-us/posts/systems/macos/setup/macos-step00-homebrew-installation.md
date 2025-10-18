---
title: Mac Initial Setup Guide
description: >-
  This guide is a development environment setup document for Apple Silicon Macs.
  Setup methods for Intel Macs are not covered.
authors:
  - XIYO
tags:
  - mac-setup
  - homebrew
  - apple-silicon
  - getting-started
modifiedAt: 2025-07-27T21:08:36+09:00
createdAt: 2025-07-23T00:45:09+09:00
---

# Mac Initial Setup Guide

This guide is a development environment setup document for Apple Silicon Macs. Setup methods for Intel Macs are not covered.

> [!INFO]
> **How to Check Your Mac Processor**
> 
> 1. Click the Apple logo in the top left corner of the screen
> 2. Select "About This Mac"
> 3. Check processor information:
>    - **Apple Silicon**: Displays as Apple M1, M2, M3, M4, etc. under "Chip"
>    - **Intel**: Displays as Intel Core i5, i7, etc. under "Processor"

> [!WARNING]
> **Intel Mac Users Warning**
> 
> Following this guide on an Intel processor Mac will not work properly.
> Only proceed if Apple Silicon (M1, M2, M3, M4) is confirmed.

## What is Homebrew?

Homebrew is a package manager for macOS. Unlike the App Store, it's a community-run open-source repository that allows developers to freely install and manage the tools and libraries they need from the command line.

### Why You Need Homebrew

Most development tools are not available on the App Store. Essential tools like Git, Node.js, Python, and Docker require downloading from their respective websites and going through complex installation processes. With Homebrew, you can solve all of this with simple commands.

### Key Features

- **Package Installation**: Install programs with a single command
- **Dependency Management**: Automatically installs required libraries
- **Version Management**: Keep installed packages up to date

## Before You Start

> [!NOTE]
> **Opening Terminal**
> 1. Press `Cmd + Space` to open Spotlight search
> 2. Type "Terminal"
> 3. Click the Terminal app to launch it

## Installing Homebrew

### Check Installation

Check if Homebrew is already installed

```bash
if command -v brew &> /dev/null; then
    echo "Homebrew is already installed."
    brew --version
else
    echo "Homebrew is not installed."
fi
```

### Install Homebrew

Run the Homebrew installation script

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> [!NOTE]
> The installation process will request your Mac login password.
> It's normal that the password doesn't appear on screen when typing.

### Environment Setup

Add the Homebrew path to your terminal configuration file

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
```

Apply immediately to the current terminal session

```bash
eval "$(/opt/homebrew/bin/brew shellenv)"
```


### Verify Installation

Confirm the installation is complete

```bash
brew --version
```

> [!TIP]
> If version information is displayed, the installation has been completed successfully.

> [!WARNING]
> **Troubleshooting**
> - Completely quit and restart Terminal
> - Restart your Mac
> - Refer to the [official Homebrew documentation](https://docs.brew.sh/Installation)

## Next Steps

Homebrew installation is complete.

[Next Step: Installing Development Tools](macos-step01-essential-developer-tools)
