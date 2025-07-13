<script>
	import Card from '$lib/ui/card/Card.svelte';
	import jjakak from '$lib/assets/jjakak.jpeg?enhanced';
	import ttodo from '$lib/assets/ttodo.png?enhanced';
	import * as m from '$lib/paraglide/messages.js';
</script>

<Card negative>
	<div class="gloves padding">
		<a class="glove content" href="https://jjakak.xiyo.dev" target="_blank">
			<enhanced:img src={jjakak} alt={m.jjakakImgAlt()} />
			<h2>JJaKaK</h2>
			<p>{m.jjakakDescription()}</p>
		</a>
		<a class="glove content" href="https://ttodo.xiyo.dev" target="_blank">
			<enhanced:img src={ttodo} alt={m.ttodoImgAlt()} />
			<h2>ttodo</h2>
			<p>{m.ttodoDescription()}</p>
		</a>
	</div>
</Card>

<style>
	.gloves {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 2rem;

		& > .glove {
			text-decoration: none;
			text-align: center;

			img {
				object-fit: cover;
				aspect-ratio: 1;
				inline-size: 100%;
				block-size: auto;
			}
		}
	}
</style>
