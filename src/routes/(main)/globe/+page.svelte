<script>
	import jjakak from '$lib/assets/jjakak.jpeg?enhanced';
	import ttodo from '$lib/assets/ttodo.png?enhanced';
	import bbakey from '$lib/assets/bbakey.png?enhanced';
	import extractor from '$lib/assets/extractor.png?enhanced';
	import zheon from '$lib/assets/zheon.png?enhanced';
	import * as m from '$lib/paraglide/messages.js';
</script>

<main>
	<div class="p-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8">
		<a class="text-center" href="https://jjakak.xiyo.dev" target="_blank">
			<enhanced:img
				src={jjakak}
				alt={m.jjakakImgAlt()}
				class="object-cover aspect-square w-full h-auto"
			/>
			<h2>JJaKaK</h2>
			<p>{m.jjakakDescription()}</p>
		</a>
		<a class="text-center" href="https://ttodo.xiyo.dev" target="_blank">
			<enhanced:img
				src={ttodo}
				alt={m.ttodoImgAlt()}
				class="object-cover aspect-square w-full h-auto"
			/>
			<h2>ttodo</h2>
			<p>{m.ttodoDescription()}</p>
		</a>
		<a class="text-center" href="https://bbakey.xiyo.dev" target="_blank">
			<enhanced:img
				src={bbakey}
				alt={'BbaKey preview image'}
				class="object-cover aspect-square w-full h-auto"
			/>
			<h2>BbaKey</h2>
			<p>{'A simple key-value tool'}</p>
		</a>
		<a class="text-center" href="https://extractor.xiyo.dev" target="_blank">
			<enhanced:img
				src={extractor}
				alt={'Extractor preview image'}
				class="object-cover aspect-square w-full h-auto"
			/>
			<h2>Extractor</h2>
			<p>{'Text/metadata extraction utility'}</p>
		</a>
		<a class="text-center" href="https://zheon.xiyo.dev" target="_blank">
			<enhanced:img
				src={zheon}
				alt={'Zheon preview image'}
				class="object-cover aspect-square w-full h-auto"
			/>
			<h2>Zheon</h2>
			<p>{'A small personal project'}</p>
		</a>
	</div>
</main>
