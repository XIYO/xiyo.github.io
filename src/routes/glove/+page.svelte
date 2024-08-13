<script>
	import Border from '$lib/Border.svelte';
	import jjakak from '$lib/assets/jjakak.jpeg?enhanced';
</script>

<Border viewTransitionName="article" negative id="article">
	<div class="highlight-background padding">
		글러브는 제가 만든 프로젝트들을 모아놓은 공간입니다.
	</div>
	<div class="gloves padding">
		<a class="glove content" href="https://jjakak.xiyo.dev" target="_blank">
			<enhanced:img src={jjakak} alt="째깍 타이머 미리보기" />
			<h2>JJaKaK</h2>
			<p>심플 타이머 입니다. PWA로 구현로 구현되어 있어 브라우저에서 앱으로 바로 설치가 가능합니다.</p>
		</a>
	</div>
</Border>

<style>
    .gloves {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        & > .glove {
            text-decoration: none;
            text-align: center;

            img {
                object-fit: cover;
                aspect-ratio: 1;
                inline-size: 100%;
                block-size: auto;
            }

            h2 {
                margin-block: 0.25rem;
            }
        }
    }
</style>
