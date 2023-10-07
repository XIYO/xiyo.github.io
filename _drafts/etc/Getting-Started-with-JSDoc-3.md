---
layout: post
title: JSDoc 3 시작하기
description : 이 문서는 JSDoc 공식 문서의 번역본 입니다.
author: XIYO
tags: [javascript, jsdoc]
categories: [javascript]
---
{{ page.description }}

## 시작하기
JSDoc 3 은 JavaScript 를 위한 API 문서 생성기 입니다, 비슷하게 Javadoc 이나 phpDocumentor 가 있습니다.  
소스 코드에 직접 `문서 주석` 을 추가하고 JSDoc Parse 가 소스 코드를 스캔해서 HTML 문서로 생성합니다.  

## 코드에 문서 주석 추가
JSDoc 의 목적은 JavaScript Application, Library 를 문서화 하는 것 입니다.  
문서화 될 수 있는 것은 modules, namespaces, classes, methods, method parameters 등 입니다.

JSDoc comments 는 일반적으로 문서화 할 코드 앞에 위치해야합니다.  
JSDoc parser 가 인식하기 위해서는 반드시 `/**` 로 시작해야합니다.  
`/*` , `/***` 등 별이 3개 이상 있으면 무시합니다. 이 주석으로 파싱을 피할 수 있습니다.

**간단한 `문서 주석`**
```js
/** This is a description of the foo function. */
function foo() {
}
```
간단한 설명을 추가하는 것은 `문서 주석` 형식을 사용하면 됩니다.

특별한 `JSDoc tags`는 다양한 정보를 제공할 수 있습니다.  
예를 들면, 클래스 생성자 함수의 경우는 `@constructor` tag 를 추가하면 됩니다.

**`JSDoc Tags`를 사용한 코드**
```js
/**
 * Represents a book.
 * @constructor
 */
function Book(title, author) {
}
```
더 많은 태그를 사용하여 다양한 정보를 추가 할 수 있습니다.  
[홈페이지]에서 JSDoc 3 의 모든 태그가 제공됩니다.

**태그로 다양한 정보 추가**
```js
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
}
```

## 웹사이트 생성
소스 코드에 `문서 주석` 을 작성하면 JSDoc 3 가 HTML 웹사이트 파일을 생성합니다.  
기본적으로, JSDoc 은 내장된 기본 템블릿을 사용하여 HTML 을 만듭니다.  
직접 템플릿을 편집하거나 새로운 템블릿을 만들 수도 있습니다.

**커맨드 라인을 이용해 문서 생성**
```console
jsdoc book.js
```
이 명령어는 현재 디렉토리에 `out/` 를 생성하고, 그 디렉토리 내부에서 HTML 이 생성됩니다.

[홈페이지]: https://jsdoc.app/index.html#block-tags