---
title: "타임리프에서 정적 자원 읽기"
description: "타임리프에서 JS 임포트시 구문 해석이 안되는 문제를 해결하는 방법"
categories: [windows, intellij]
tags: [windows, intellij, thymeleaf, static, import]
---

# {{ page.title }}

{{ page.description }}

## 문제와 원인

![정적 리소스를 IDE가 찾지 못해서 경고 발생](image.png)

HTML에서 리소스를 임포트하면 경로를 파악하지 못하는 문제가 발생합니다. \
인텔리제이에서 리소스 루트 디렉토리가 `/resources/static` 이 아닌 `/resources` 이기 때문입니다.

## 해결방법

정적 리소스의 경로를 명시하여 IDE가 찾을 수 있도록 합니다.

![리소스를 등록하는 방법](image-1.png)

> **note**
>
> <kdb>Ctrl</kdb> + <kdb>Alt</kdb> + <kdb>Shift</kdb> + <kdb>S</kdb> 를 눌러 프로젝트 스트럭처 창을 열 수 있습니다.

## 이유

이 방법을 사용하는 이유는 IDE에서 자바스크립트의 구문 도움을 받기 위해서 입니다. 가벼운 프로젝트라면 굳이 필요 없겠지만, 자바스크립트의 런타임 오류를 보완하기 위해서는 IDE의 도움을 받아 코드를 작성하는 것이 좋습니다.
