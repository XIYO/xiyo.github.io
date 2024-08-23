# 스벨트의 새로운 룬, state.link

[svelte@5.0.0-next.229](https://github.com/sveltejs/svelte/releases/tag/svelte%405.0.0-next.229)에서 새로운 룬인 `$state.link`기능이 도입되었습니다.
이 룬은 단방향 상태관리 기능입니다.

## 사용 상황

인자로 주입받은 반응형 변수에 의존적이면서도 클로저 처럼 스코프 내에서만 변경가능한 값을 가져야하는 파생 반응형 변수가 필요할때 사용할 수 있습니다.

## 예제

`component.svelte`
```svelte
<script>  
  let { value = $bindable() } = $props();  
  
  let stateLinkValue = $state.link(value);  
</script>
  
<p>부보에게 전달 받은 상태 변수 값 : {value}</p>
<button onclick={() => {value++}}>{value}</button>
  
<h2>bindable - state link 래핑</h2>  
<button onclick={() => {stateLinkValue++}}>{stateLinkValue}</button>
```

위 예제를 보면 `value`를 상태 변수로 주입받아 `$state.link`로 생성합니다.
부모가 전달한 값이 달라지면 즉각적으로 변화가 발생하면서도, 컴포넌트 내부에서도 독립적으로 값을 유지할 수 있습니다.
