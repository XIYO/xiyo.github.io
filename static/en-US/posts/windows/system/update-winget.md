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
title: How to Fix WinGet Execution Errors
description: >-
  I recently reinstalled Windows because my computer was running slow. However,
  when I tried to install packages using the
---
# How to Fix WinGet Execution Errors

I recently reinstalled Windows because my computer was running slow. However, when I tried to install packages using the `winget` command, I encountered an issue where it wouldn't even execute.

The command `winget -v` works fine, but the `winget install` command does not execute.

## Solution

You need to update the App Installer.

![Downloading updates for all apps from the App Store](/static/resources/update-winget-20240918110056451.png)

0. Open the Microsoft Store.
1. Click on "Download Updates" in the Library.

