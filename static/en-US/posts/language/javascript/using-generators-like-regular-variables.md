---
authors:
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
dates:
  - '2024-09-08T12:40+0900'
  - '2024-09-05T23:19+0900'
  - '2024-09-03T23:20+0900'
  - '2024-09-01T20:51+0900'
  - '2024-08-23T07:18+0900'
  - '2024-08-23T06:39+0900'
  - '2024-08-23T04:02+0900'
  - '2024-08-22T18:47+0900'
  - '2024-08-22T18:45+0900'
messages:
  - ':art: 로케일 코드 제거하고, 번역된 파일을 기존 처럼 /static/{locale} 구조로 저장'
  - ':globe_with_meridians: 기존 국제화 방식을 제거하고 새로운 방식으로 번역본 추가'
  - ':globe_with_meridians: translate'
  - Paraglidejs (#35)
  - ':pencil2: 오타 수정'
  - ':fire: 테스트용 코드 삭제'
  - ':art: run format'
  - ':memo: 제목 변경'
  - ':memo: 제너레이터 포스팅'
title: Using Generators Like Regular Variables
description: 'In JavaScript, you can create iterable objects using generators.'
---
# Using Generators Like Regular Variables

In JavaScript, you can create iterable objects using generators.

## Purpose

You can turn infinite functions, like those calculating Fibonacci numbers, into controllable iterables.

## Syntax

```javascript
function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

const fibonacci = fibonacciGenerator();

console.log(fibonacci.next().value); // 1
console.log(fibonacci.next().value); // 1
console.log(fibonacci.next().value); // 2

// Alternatively, use a for...of loop to print the Fibonacci sequence (note: termination condition is needed)
for (const value of fibonacci) {
    console.log(value); // 3, 5, 8, ...
    if (value >= 13) break;
}
```

> This is the most common generator syntax.

However, it lacks encapsulation and feels like simply using the generator as is.

## Improvement

```javascript
const fibonacci = {
    prev: 0,
    curr: 1,

    valueOf() {
        const value = this.curr;
        [this.prev, this.curr] = [this.curr, this.prev + this.curr];
        return value;
    },

    *[Symbol.iterator]() {
        while (true) {
            yield this.valueOf();
        }
    }
};

console.log(fibonacci); // 1
console.log(fibonacci); // 1
console.log(fibonacci); // 2

// Using it as an iterable
for (const value of fibonacci) {
    console.log(value); // 3, 5, 8, ...
    if (value >= 13) break; // Prevent infinite loop
}
```

> The generator has been encapsulated, allowing it to be called like a variable.

The design of calling the Fibonacci variable itself generates side effects, allowing it to be used in the concept of "activation."

