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
title: SOLUTION INTELLIJ SHORTCUT CONFLICT
description: 'This document explains how to resolve shortcut conflicts in '
---
# SOLUTION INTELLIJ SHORTCUT CONFLICT

This document explains how to resolve shortcut conflicts in *IntelliJ*.

After using IntelliJ for about a week, I encountered a warning. \
The latest version of IntelliJ has overridden key functions, so conflicts do not occur. \
If there are no issues with usage, you can ignore the warning message.

## ENVIRONMENT

- macOS 14.0 (Sonoma)
- IntelliJ IDEA Ultimate 2023.2.2
  - New UI
    - Compact mode

## PROBLEM

![Shortcut Conflict Warning](/static/resources/2023-10-27-11-00-19.png)

A warning about a shortcut conflict has appeared.

## SOLUTION

### INTELLIJ

![Check Shortcut Conflict](/static/resources/2023-10-27-11-10-04.png)

By checking the *Keymap* through the *Modify Shortcuts* link, I found that the shortcut <kbd>⇧</kbd> + <kbd>⌘</kbd> + <kbd>A</kbd> is in conflict.

### MACOS, SONOMA

First, open the Settings app.

0. **Settings Screen**:

   ![How to Access Keyboard Shortcuts in Settings](/static/resources/2023-10-27-11-52-59.png)

   0. Click on the *Keyboard* menu
   1. Click on the *Keyboard Shortcuts* button

1. **Keyboard Shortcuts Screen**:

   ![Check Shortcut Settings in Sonoma](/static/resources/2023-10-27-11-59-56.png)

   0. Click on the *Services* menu
   1. Click on the *Text* item
   2. **Uncheck** the *Search man Page Index in Terminal* item

## WHAT IS *SEARCH MAN PAGE INDEX IN TERMINAL*?

![Shortcut Execution Result](/static/resources/2023-10-27-12-08-57.png)

This feature is responsible for passing the selected text to the terminal as a manual option. \
If the manual exists in the system, it will be displayed.

However, the argument passed to the *man* option is incorrectly formatted as *sudo;type=a*, which causes it to fail to find the manual and display a message indicating that the manual is not available.

**Executable Command**:

```text
man sudo;type=a
```

This command outputs the manual without any issues.

**Command That Causes an Error (Speculation)**:

```text
man "sudo;type=a"
```

This command outputs the same text as when executed with the shortcut.

