---
title: Static Initialization of Classes
description: >-
  Introducing the static initialization method used in the code that creates and
  manages categories on my blog, and a case of improvement to better code.
authors:
  - XIYO
  - xiyo
lastModified: 2025-07-27T21:08:36+09:00
published: 2025-07-22T01:56:54+09:00
---
# Static Initialization of Classes

Introducing the static initialization method used in the code that creates and manages categories on my blog, and a case of improvement to better code.

In my blog project, I designed [Category.js](https://github.com/XIYO/xiyo.github.io/blob/a1bbc44ebd12986ce1d06d74273c6242efbae4f2/src/lib/post/Category.js "Code that performs class initialization externally") using class syntax to manage categories.  
The most important aspect during design was minimizing member exposure.
I declared all members as private with `#` to prevent direct external access,
and when member exposure was necessary, I provided only getters for fields to restrict writing, and converted methods to public methods.

## Initial Design

I wanted `Category.js` to have a structure that [returns category instances through static methods](https://github.com/XIYO/xiyo.github.io/blob/a1bbc44ebd12986ce1d06d74273c6242efbae4f2/src/lib/post/Category.js#L84-L100) without instantiation through the `new` keyword.

```js
import Category from '$lib/post/Category.js';

Category.getCategory("Windows") // Returns Windows category instance
```

> Design to get already created category instances through static methods

To use it this way, [initialization had to occur internally](https://github.com/XIYO/xiyo.github.io/blob/a1bbc44ebd12986ce1d06d74273c6242efbae4f2/src/lib/post/Category.js#L178) simultaneously with import without separate initialization. After considering how to initialize simultaneously with import without exposing methods externally,
- I declared a "Symbol" outside the class,
- Used the "Symbol" as a method name inside the class,
- And implemented an initialization method that isn't exposed externally by executing that method.

```js data-title="Category.js"
const symbol = Symbol('Category initialization');

export default class Category {
	static [symbol]() {
	    // ...init
	}
}

Category[symbol]();
```

> Initialization method preventing external access by defining method names using symbols

However, this approach had drawbacks.
Using reflection, the initialization method could be accessed,
and there was a possibility of re-executing initialization through this.
Improvements were needed to prevent this issue in the future.

## Improvement with Static Initialization Block

In Java, you can initialize static and instance members through `{}` blocks.
[JavaScript can also apply this to class syntax](https://github.com/XIYO/xiyo.github.io/blob/ebd7d90f357ef507654a1a6b08aa4ece8f42d0d1/src/lib/post/Category.js#L16-L29 "Code using static initialization block") to make the code more concise.

> [!NOTE]
> Prototypes can implement static initialization logic using Immediately Invoked Function Expressions, "IIFE".

```js data-title="Category.js"
const symbol = Symbol('Category initialization'); // [!code --]

export default class Category {
	static [symbol]() { // [!code --]
	static { // [!code ++]
	    this.#member = data; // Can use 'this' keyword in static initialization // [!code ++]
	    // ...init
	}
}

Category[symbol](); // [!code --]
```

> Initialization inside the class through static initialization block

### Differences in Initialization Blocks Between Java and JavaScript

In Java, you can use two types of initialization blocks:
- `static {}`, static initialization block
- `{}`, instance initialization block

In contrast, JavaScript can only use one type of initialization block:
- `static {}`, static initialization block

Additionally, Java and JavaScript differ in the use of the `this` keyword in initialization blocks.
Java can only use `this` after instance creation,
but JavaScript, being a first-class object, can use `this` in static initialization blocks to access static members.
This difference is because JavaScript better supports functional programming characteristics.
