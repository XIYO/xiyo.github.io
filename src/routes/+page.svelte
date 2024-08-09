<script>
	import Header from '$lib/Header.svelte';
	import Border from '$lib/Border.svelte';
</script>

<Header>
	<h1>Welcome</h1>
</Header>

<Border viewTransitionName="content" padding content negative>
	<p>
		"HTML"은 Hyper Text Markup Language의 약자로, 👌 마크업 랭귀지 입니다. 하지만 모던 웹은 그것을
		뛰어넘어 다양한 기능을 요구하기 시작했고, ⚡ 자바스크립트의 발전이 시작 되었습니다.
	</p>
	<p>하지만 몇 가지 질문을 던져보고 싶습니다.</p>
	<ul>
		<li>당신의 사이트는 꼭 자바스크립트가 필요한가요? ❓</li>
		<li>자바스크립트를 비활성화 한 사용자를 존중 하고 있나요? ⛔</li>
	</ul>
	<p>이 블로그는 그런 생각에서 시작되었습니다. 💭</p>
	<p>
		자, 이제 자바스크립트를 끄고 이 블로그를 보는 것은 어떨까요? 🤗<br />
		물론, 켜 놓고 보면 더 풍부한 경험을 제공하지만, 선택은 여러분의 몫입니다.
	</p>
</Border>
