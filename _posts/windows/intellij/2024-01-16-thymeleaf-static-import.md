---
title: "타임리프에서 정적 자원 읽기"
description: "스프링부트 타임리프 프로젝트에서 자바스크립트 파일을 임포트시에 인텔리제이에서 정적 자원을 인식하지 못 해 구문 분석이 정상적이지 않은 상황을 해결합니다."
categories: [windows, intellij]
tags: [windows, intellij, thymeleaf, static, import]
---

# {{ page.title }}

{{ page.description }}

이 문제가 발생하더라도 실제 빌드 후 결과물에는 아무런 문제가 발생하지 않지만 코드 작성시 자바스크립트를 도움없이 작성하는 것은 매우 불편하며, 런타임 오류를 발생시킬 수 있습니다.

## 원인

![정적 리소스를 IDE가 찾지 못해서 경고 발생](/assets/resources/2024-01-16-13-38-33.png)

HTML에서 리소스를 임포트하면 경로를 파악하지 못하는 문제가 발생합니다.
인텔리제이에서 리소스 디렉토리가 `src/main/resources`만 등록되어있기 때문입니다.

## 해결방법

`src/main/resources/static` 디렉토리를 추가로 등록하여, 다른 리소스의 경로를 인식할 수 있게 합니다.

![리소스 경로를 등록하는 방법](/assets/resources/2024-01-16-13-38-45.png)

> **note**
>
> <kdb>Ctrl</kdb> + <kdb>Alt</kdb> + <kdb>Shift</kdb> + <kdb>S</kdb> 를 눌러 `프로젝트 스트럭처` 창을 열 수 있습니다.
