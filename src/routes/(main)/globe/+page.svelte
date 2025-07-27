<script>
	import jjakak from '$lib/assets/jjakak.jpeg?enhanced';
	import ttodo from '$lib/assets/ttodo.png?enhanced';
	import * as m from '$lib/paraglide/messages.js';
</script>

<main>
	<div class="p-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8">
		<a class="text-center" href="https://jjakak.xiyo.dev" target="_blank">
			<enhanced:img src={jjakak} alt={m.jjakakImgAlt()} class="object-cover aspect-square w-full h-auto" />
			<h2>JJaKaK</h2>
			<p>{m.jjakakDescription()}</p>
		</a>
		<a class="text-center" href="https://ttodo.xiyo.dev" target="_blank">
			<enhanced:img src={ttodo} alt={m.ttodoImgAlt()} class="object-cover aspect-square w-full h-auto" />
			<h2>ttodo</h2>
			<p>{m.ttodoDescription()}</p>
		</a>
	</div>
</main>

