---
authors:
  - XIYO
  - XIYO
  - XIYO
dates:
  - '2024-09-10T20:23+0900'
  - '2024-09-08T12:40+0900'
  - '2024-09-05T23:19+0900'
messages:
  - ':art: 리소스 경로를 규격에 맞게 통일'
  - ':art: 로케일 코드 제거하고, 번역된 파일을 기존 처럼 /static/{locale} 구조로 저장'
  - ':globe_with_meridians: 기존 국제화 방식을 제거하고 새로운 방식으로 번역본 추가'
title: LOCK DESKTOP SPACE
description: Learn how to lock the desktop spaces in Mission Control.
---
# LOCK DESKTOP SPACE

Learn how to lock the desktop spaces in Mission Control.

## ENVIRONMENT

- macOS 14.0 (Sonoma)

## WHAT IS *MISSION CONTROL*?

Mission Control provides an overview of all currently open windows and full-screen applications, allowing for quick switching and management.

## SOLUTION

![Mission Control Options Settings Screen](/static/resources/2023-10-27-13-36-46.png)

0. **Settings Screen**:

   0. Click on the *Desktop & Dock* menu.
   1. Navigate to the *Mission Control* section.
   2. **Uncheck** the option for *Automatically rearrange Spaces based on most recent use*.

## OPTIONS DESCRIPTION

0. **Automatically rearrange Spaces based on most recent use**:

   When this option is enabled, the most recently used spaces (desktop environments) are automatically arranged to the left. Disabling this option will prevent the order of spaces from changing.

1. **When switching to an application, switch to a Space with open windows for the application**:

   Enabling this option will automatically switch to the space where the windows for the specific application are open when you switch to that application.

2. **Group windows by application**:

   When this option is enabled, multiple windows of the same application will be grouped together in the Mission Control view.

3. **Displays have separate Spaces**:

   This allows each display in a multi-display setup to have its own separate spaces. Enabling this option lets you set up independent desktop environments for each monitor.

