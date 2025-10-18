---
title: Iterator
description: Defines how to traverse a collection
authors:
  - XIYO
  - xiyo
modifiedAt: 2025-07-27T21:08:36+09:00
createdAt: 2025-07-22T01:56:54+09:00
---
# Iterator

Defines how to traverse a collection

> [!TIP]
> Collection refers to sets of multiple elements such as arrays, lists, stacks, queues, etc.

## When to Use?

Use the Iterator pattern when creating collections in your code and you want to provide a standardized way to traverse the collection.

## Comparison

### Direct Traversal Without Iterator Pattern

```javascript
class KingArr {
	#arr;

	constructor([]) {
		this.#arr = [];
	}

	i = 0;

	// No naming convention, using custom naming
	get kingElement() {
		if (this.i >= this.#arr.length) {
			return undefined;
		}
		return this.#arr[i++];
	}

	kigeReset() {
		this.i = 0;
	}
}

const myArr = new KingArr();

// If the element name in MyArr class changes, this code needs to be updated too
try {
	while (myArr.kingElement)
        console.log(myArr.kingElement);
} catch (e) {
    console.error(e);
} finally {
    myArr.kigeRestart();
}
```

A developer created the first version of `KingArr`, but since errors can occur during traversal, it's inconvenient to always use `try catch` statements.

Developers unfamiliar with `KingArr`'s traversal method might iterate without exception handling.
The naming is also unclear, so method names are likely to change, and when that happens, all code using it must be updated accordingly.

### With Iterator Pattern Applied

It's implemented in all languages and many libraries use iterators, so implementing an iterator makes it compatible.

```javascript
class KingArr {
  #arr;
  
  constructor(arr = []) {
    this.#arr = arr;
  }

  // Define iterator method
  [Symbol.iterator]() {
    let index = 0;
    const items = this.#arr;

	// Return object with next method
    return {
      // Return object with done and value fields
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        }
        return { done: true };
      }
    };
  }
}

// Usage example
const myArr = new KingArr([10, 20, 30, 40]);

// Safe traversal with for...of
for (const item of myArr) {
  console.log(item);  // 10, 20, 30, 40
}

// Can use spread operator
const arrCopy = [...myArr];
console.log(arrCopy);  // [10, 20, 30, 40]
```

In JavaScript, iterator implementation becomes an iterator by creating a method named `Symbol.iterator`.

This function should return an object with a function named `next()`, and
the `next()` method should return an object containing two fields: `done` and `value`.
