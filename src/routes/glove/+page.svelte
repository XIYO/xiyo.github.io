<script>
	import Border from '$lib/Border.svelte';
	import jjakak from '$lib/assets/jjakak.jpeg?enhanced';
</script>

<Border viewTransitionName="content" padding negative id="content">
	<a class="glove content" href="https://jjakak.xiyo.dev" target="_blank">
		<enhanced:img src={jjakak} alt="째깍 타이머 미리보기" />
		<h2>JJaKaK</h2>
	</a>
</Border>

<style>
	:global(#border-inner-content) {
		display: grid;

		grid-template-columns: repeat(3, 1fr);

		:global(&) > .glove {
			img {
				object-fit: cover;
				aspect-ratio: 1;
				inline-size: 100%;
				block-size: auto;
			}

			h2 {
				text-align: center;

				margin-block: 0.5rem;
			}
		}
	}
</style>
