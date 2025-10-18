---
title: Git & GitHub Setup
authors:
  - XIYO
tags:
  - mac-setup
  - git
  - github
  - version-control
  - ssh
  - github-cli
modifiedAt: 2025-07-27T21:08:36+09:00
createdAt: 2025-07-22T02:44:08+09:00
---

# Git & GitHub Setup

> [!NOTE]
> **Prerequisites**
> [Installing Essential Developer Tools](macos-step01-essential-developer-tools) must be completed.

## Basic Git Configuration

### Set User Information

Set the name and email that will be used in Git commits.

Open Terminal and copy-paste the following command:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

> [!TIP]
> It's recommended to use the same email as your GitHub account.
> It can be different, but it makes it harder to quickly identify who made commits.

### Set Default Branch Name

Match the default branch name with GitHub.

Open Terminal and copy-paste the following command:

```bash
git config --global init.defaultBranch main
```

> [!INFO]
> **Why does Git create a default branch as master while GitHub creates it as main?**
>
> Since the term 'master' can evoke master/slave connotations, many services including GitHub have changed to the more neutral 'main' starting from 2020.
>
> Git itself hasn't changed the default yet to prioritize backward compatibility, but provides options for users to change the settings themselves.
> The above command sets Git's default branch to 'main' to match GitHub.

### Line Ending Configuration

Prevent issues caused by line ending differences when collaborating with Windows users.
Since servers are mostly Unix/Linux, **Windows users should adapt, and this setting is unnecessary if only Mac/Linux users collaborate**.

Only run the following command when collaborating with other OS users:

```bash
git config --global core.autocrlf input
```

> [!WARNING]
> **Required Setting for Windows Users**
>
> If there are multiple OS types in a collaborative project and Windows users are involved,
> **only Windows users must** run `git config --global core.autocrlf true`.
> [!INFO]
> **Problems Caused by Line Ending Differences**
>
> When line endings differ between Windows and Unix/Linux, entire files appear modified
> in staging even though no actual code was changed.
>
> **Why is this a problem?**
>
> - Development tools like IntelliJ don't display line ending characters, so you can't see what changed
> - Line endings are automatically converted every checkout, creating unnecessary changes
> - It becomes difficult to find actual code changes, making code review harder
>
> The above setting converts to the appropriate OS format on checkout and unifies to Unix format (LF) on commit,
> preventing this confusion.

## What is GitHub CLI (gh)?

GitHub CLI is an official tool that lets you use all GitHub features directly from the terminal without opening a web browser.
You can handle PR creation, issue management, repository cloning, etc. with commands without interrupting your development flow.

### GitHub CLI Login

To use GitHub CLI, you first need to save GitHub authentication information on your current computer.
Once you go through this process, you can perform all GitHub operations without authentication.

Open Terminal and copy-paste the following command:

```bash
gh auth login
```

> [!INFO]
> **Advantages of gh Login**
>
> When you log in with GitHub CLI, authentication information is securely saved in the system.
> After that, when using commands like `git push` or `git pull`:
>
> - No need to enter username and password every time
> - Can skip the complex Personal Access Token issuance process
> - Can use GitHub features like PR creation and issue management directly from terminal
>
> But there are still beginners who insist on using only browsers saying CLI is inconvenient 🥲

Options to select during authentication:

1. **What account do you want to log into?** → GitHub.com
2. **What is your preferred protocol for Git operations?** → HTTPS
3. **Authenticate Git with your GitHub credentials?** → Y
4. **How would you like to authenticate GitHub CLI?** → Login with a web browser

### Verify Authentication

Check if GitHub authentication was completed successfully.

Open Terminal and copy-paste the following command:

```bash
gh auth status
```

## SSH Key Setup

SSH (Secure Shell) is a protocol for encrypted communication.
GitHub allows safer and more convenient authentication using SSH keys instead of passwords.

> [!INFO]
> **SSH setup is optional**
>
> - **If already authenticated with HTTPS via gh CLI**: Not necessary
> - **If you prefer SSH**: Follow the steps below to set up
> - **Enterprise environments**: Security-focused environments don't allow HTTPS and only permit SSH

### What is an SSH Key?

An SSH key is a digital ID card that replaces passwords.
Like actual keys, it consists of a **private key** and **public key** pair:

- **Private key**: Key kept only on your computer (never share!)
- **Public key**: Lock registered on GitHub (safe to share)

When you register a public key on GitHub, it only allows access when it matches your computer's private key.
It's like installing a lock on GitHub that only opens with your key.

### Generate SSH Key

Generate a new SSH key.

Open Terminal and copy-paste the following command:

```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

Press Enter 3 times to proceed with defaults.

> [!INFO]
> **Command Option Explanation**
>
> - `-t ed25519`: Specify encryption algorithm type (ed25519 is currently the safest and fastest algorithm, can be omitted as it's the default on latest macOS)
> - `-C "your.email@example.com"`: Comment to identify the key (can be omitted as Mac name is automatically added if not specified)
> [!WARNING]
> **DO NOT set an SSH key password!**
>
> While you can set a password when generating SSH keys, it's absolutely not recommended for beginners.
> If you forget the password, you won't be able to use the key and will struggle greatly.
>
> Consider setting a password for security enhancement after becoming a DevOps expert.
> (But that situation might never come...😅)

### Check After Key Generation

After key generation is complete, two files are created in the `~/.ssh/` folder:

- `id_ed25519` - **Private key** (never share!)
- `id_ed25519.pub` - **Public key** (the one with `.pub` extension is the public key)

> [!INFO]
> **Checking SSH Keys on macOS**
>
> These files are in a hidden folder and not visible in Finder.
> You can check them in Terminal with `ls -la ~/.ssh/`.

### Add SSH Key to GitHub

Add the generated SSH public key to your GitHub account.

> [!INFO]
> **What does adding an SSH key to GitHub mean?**
>
> This is the process of registering the public key (`id_ed25519.pub`) you created earlier to your GitHub account.
> It's like leaving a lock (public key) with GitHub server saying "please only allow access to my account
> for people who have this key (private key)".
>
> After registration, you'll be automatically authenticated without password input
> when doing `git push`, `git pull`, etc. from terminal.

Open Terminal and copy-paste the following command:

```bash
gh ssh-key add ~/.ssh/id_ed25519.pub --title "My Mac"
```

## Verify Settings

Check if all Git settings are configured correctly.

Open Terminal and copy-paste the following command:

```bash
git config --list
```

If you see content similar to below, the settings are correctly completed:

```text
user.name=Your Name
user.email=your.email@example.com
init.defaultbranch=main
core.autocrlf=input
```

> [!INFO]
> **Setting Verification Points**
>
> - `user.name` and `user.email` are correctly set
> - Default branch is set with `init.defaultbranch=main`
> - Line ending handling is set with `core.autocrlf=input` (when collaborating with Windows users)
>

## Creating GitHub Repository with GitHub CLI

Once setup is complete, you can now easily create GitHub repositories with gh commands.

### Upload Current Directory to GitHub

> [!DANGER]
> **If you have sensitive information, make sure to create as private!**
>
> Projects containing API keys, passwords, personal information, etc. must be created as private repositories.
> If made public, anyone in the world can see it.

```bash
# Create current directory as private repository and push immediately (default recommendation)
gh repo create my-project --private --source=. --remote=origin --push
```

> [!INFO]
> **Repository Visibility Options**
>
> - `--private`: Only visible to you and invited people (default recommendation)
> - `--public`: Visible to anyone in the world
> - `--internal`: Only visible to organization members (for organization accounts only)

### Create New Repository and Clone

```bash
# Create repository on GitHub first
gh repo create my-new-project --public --clone
```

### Useful gh Commands

```bash
# View repository list
gh repo list

# Open repository in browser
gh repo view --web

# Create PR
gh pr create

# View issue list
gh issue list
```

[Go Back](macos-step01-essential-developer-tools)
