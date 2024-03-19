# 배열 확인하는 방법

객체를 깊은 복사해야는 메서드를 만드는 중 고민이 생겼습니다. \
배열을 정확히 확인하는 방법에 대해서 `instance of`와 `Array.isArray` 무엇이 현명한 방법인지 알아보겠습니다.

**결론, 배열의 검사는 반드시 `Array.isArray`를 사용하세요.**

> 알아두기
>
> ES5 부터 `Array.isArray`가 추가되었습니다.

## 검증

```javascript
// 리터럴 생성, 일치
let a = [];
console.log('[]', a instanceof Array); // true
console.log('[]', Array.isArray(a)); // true
console.log('[]', a.constructor.name); // Array
console.log('[]', typeof a); // object

// 객체 생성, 일치
let b = new Array();
console.log('new Array()', b instanceof Array); // true
console.log('new Array()', Array.isArray(b)); // true
console.log('new Array()', b.constructor.name); // Array
console.log('new Array()', typeof a); // object

// 이발 생성, 일치
let c = window.eval('[]');
console.log('window.eval', c instanceof Array); // true
console.log('window.eval', Array.isArray(c)); // true
console.log('window.eval', c.constructor.name); // Array
console.log('window.eval', typeof c); // object		

// 아이프레임 이발 생성, 불일치
let iframe = document.createElement('iframe');
let d = iframe.contentWindow.eval('[]');
console.log('iframe.eval', d instanceof Array); // false
console.log('iframe.eval', Array.isArray(d)); // true
console.log('iframe.eval', d.constructor.name); // Array
console.log('iframe.eval', typeof d); // object

// 워커 내부에서 생성, 불일치
const worker = new Worker();

// 워커로부터 메시지 수신 시 실행될 콜백 함수
worker.onmessage = function(event) {
	const d = event.data;

	console.log('Worker array', d instanceof Array); // false
	console.log('Worker array', Array.isArray(d)); // true
	console.log('Worker array', d.constructor.name); // Array
	console.log('Worker array', typeof d); // object
};
```

> 찾았다! 자바스크립트의 누더기 메서드! \
> 도대체 다른 결과가 없는데 왜 `Array.isArray`를 왜 만든거지?...

마지막 `iframe`의 객체로 만든 배열은 `instanceof`로 확인했을 때 `false`가 나왔습니다.

### 그래서 왜 `d instanceof Array`는 `false`가 나왔을까?

`instanceof`는 객체의 프로토타입 체인을 확인합니다. \
즉 부모 부터 조상까지 검증합니다.

그런데 'd'는 `iframe`의 `contentWindow`의 `eval`로 만들었기 때문에 
조상이 스크립트 실행 당시의 `window`가 아니라 `iframe` 내부에 있는 `window` 객체입니다.

> 자바스크립트는 `window.`을 생략하면 자동으로 `window.`를 붙여줍니다.

`d instanceof Array` 이 코드를 정리하면 `d`는 옆집 바구니고, 
`Array` 는 우리집 바구니를 포인터로 가지고 있기 때문에 `false`가 나옵니다.

### 겨우 이거 하나 때문에 `Array.isArray`를 만들었나?

