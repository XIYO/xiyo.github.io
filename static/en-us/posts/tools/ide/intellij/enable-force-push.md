---
title: ENABLE FORCE PUSH ON INTELLIJ
description: >-
  By default, force push is protected on the master and main branches in
  IntelliJ. \
authors:
  - XIYO
lastModified: 2025-07-27T21:08:36+09:00
published: 2025-07-22T01:56:54+09:00
---
# ENABLE FORCE PUSH ON INTELLIJ

By default, force push is protected on the master and main branches in IntelliJ. \
Let's explore how to resolve this.

## SCENARIO

To automate deployment using GitHub Actions, I encountered several syntax errors. \
As a result, messy test code was left in the commit log, and I needed to enable force push to clean it up.

## SOLUTION

![open search everywhere](./assets/enable-force-push-20240918104825841.png)
![modify protected branch](./assets/enable-force-push-20240918104833418.png)

- Step 0: Press the shortcut keys <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd> to open the `Search Everywhere` window.  
- Step 1: In the `Search Everywhere` window, type "Protected branches:" and click on the matching item.  
- Step 2: In the `settings` window, locate the `Protected branches:` field and delete its contents.

## TROUBLESHOOTING

Since GitHub and GitLab have branch protection features, you need to check the settings of each repository.

