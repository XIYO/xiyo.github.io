---
layout: post
title: JSDoc namepath 사용하기
description: 이 문서는 JSDoc 공식 문서를 읽기 쉽게 가공했습니다.
author: XIYO
tags: [javascript, jsdoc]
categories: [javascript]
---

{{ page.description }}

## JSDoc 3 의 namepaths

JSDoc 을 사용해서 생성한 HTML 문서에서 참조한 대상에 링크가 필요한 경우 `namepath` 를 사용하여 연결합니다.

**JSDoc 3 Namepaths 의 기본 문법**

```console
/** 설명 {@link myFunction} */
/** 설명 {@link MyConstructor} */
/** 설명 {@link MyConstructor#instanceMember */
/** 설명 {@link MyConstructor.staticMember */
/** 설명 {@link MyConstructor~innerMember */ JSDoc 2 는 대시를 사용합니다.
```

아래의 예제는 총 3개의 "say" 가 있습니다.

- instance method "say"
- inner function "say"
- static method "say"

이 것들에 대해서 네임스페이스 규칙으로 적용하겠습니다.

```js
let Person = function () {
  this.say = function () {
    return "instance 입니다.";
  };

  function say() {
    return "inner 입니다.";
  }
};
Person.say = function () {
  return "static 입니다.";
};

var p = new Person();
p.say(); // instance.
Person.say(); // static.
// inner 는 외부에서 직접 접근 할 수 없습니다.
```

**namepath syntaxes 로 세 종류의 method 를 참조할 수 있습니다**

```js
Person#say  // the instance method named "say."
Person.say  // the static method named "say."
Person~say  // the inner method named "say."
```

/\*\*

- this is constructor
- @constructor
  \*/
  NamepathSample1 = function () {
  /\*\*

  - value member
  - @type {number}
    \*/
    this.valueMember = 1;

  /\*\*

  - instance member
  - @returns {string}
    \*/
    this.instanceFunc = function () {
    return "instanceFunc";
    }

  /\*\*

  - inner function
  - @returns {string}
    \*/
    let innerFunc = function () {
    return "innerFunc";
    }

  /\*\*

  - inner function caller
  - member function
    \*/
    this.innerFuncCall = function () {
    this.instanceFunc();
    innerFunc();
    }

}

/\*\*

- static function
- @returns {string}
  \*/
  NamepathSample1.staticFunc = function () {return "staticFunc";}

/\*\*

- Object
- @namespace
  \*/
  let namepathSample2 = function () {
  this.memberValue = 2;
  this.namepathSample = new NamepathSample1();
  }

/\*\*

- 구현체는 namepathSample1 입니다. {@link namepathSample2.}
- @returns {string}
  \*/
  namepathSample2.prototype.instanceFunc = function () {
  return "prototype func";
  }
  namepathSample2.prototype.namepathSample1InstanceCaller = function () {
  this.namepathSample.instanceFunc();
  }

let proto1 = new NamepathSample1();
console.log(proto1.valueMember);
console.log(proto1.instanceFunc());

let proto2 = new namepathSample2();
console.log(proto2.memberValue);
console.log(proto2.instanceFunc());
