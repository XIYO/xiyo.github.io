---
authors:
  - XIYO
  - XIYO
  - XIYO
dates:
  - '2024-09-18T11:16+0900'
  - '2024-09-08T12:40+0900'
  - '2024-09-05T23:19+0900'
messages:
  - ':truck: 이미지 경로를 전부 /static/resource 로 이동'
  - ':art: 로케일 코드 제거하고, 번역된 파일을 기존 처럼 /static/{locale} 구조로 저장'
  - ':globe_with_meridians: 기존 국제화 방식을 제거하고 새로운 방식으로 번역본 추가'
title: ENABLE FORCE PUSH ON INTELLIJ
description: >-
  By default, force push is protected on the master and main branches in
  IntelliJ.
---
# ENABLE FORCE PUSH ON INTELLIJ

By default, force push is protected on the master and main branches in IntelliJ. \
Let's explore how to resolve this.

## SCENARIO

To automate deployment using GitHub Actions, I encountered several syntax errors. \
As a result, messy test code was left in the commit log, and I needed to enable force push to clean it up.

## SOLUTION

![open search everywhere](/static/resources/enable-force-push-20240918104825841.png)
![modify protected branch](/static/resources/enable-force-push-20240918104833418.png)

- Step 0: Press the shortcut keys <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd> to open the `Search Everywhere` window.  
- Step 1: In the `Search Everywhere` window, type "Protected branches:" and click on the matching item.  
- Step 2: In the `settings` window, locate the `Protected branches:` field and delete its contents.

## TROUBLESHOOTING

Since GitHub and GitLab have branch protection features, you need to check the settings of each repository.

