<script>
	import { T } from '@threlte/core';
	import { Environment, Float, interactivity, Stars, TrackballControls, useCursor } from '@threlte/extras';
	import gem from '$lib/threlte/assets/envmap/gem.png';
	import { DoubleSide } from 'three';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const { hovering, onPointerEnter, onPointerLeave } = useCursor()

	let color = $state(0xff0000);
	function handleClicked() {
		color = Math.random() * 0xffffff;
	}

	const roughness = tweened(.5, {
		duration: 1000, // 변화에 걸리는 시간 (밀리초)
		easing: cubicOut, // easing 함수 (선택 사항)
	});

	$effect(() => {
		roughness.set($hovering ? 0.25 : .5);
	});


	let path = gem.split('/').slice(0, -1).join('/') ?? '';
	path = path.replace(/\/?$/, '/'); // 마지막에 /를 추가합니다.
	const filename = gem.split('/').at(-1) ?? '';

	interactivity()
</script>

<T.PerspectiveCamera
	makeDefault
	position={[5, 5, 5]}
	oncreate={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}
>
<!--		<TrackballControls />-->
</T.PerspectiveCamera>

<T.AmbientLight />
<T.DirectionalLight position={[0, 10, 0]} />

<Stars
	depth={250}
/>

<Environment
	path={path}
	files={filename}
/>
<Float
	floatingRange={[-.25, .25]}
	floatIntensity={2}
	rotationIntensity={1}
	rotationSpeed={[2.5, 5, 0]}
	speed={5}
>

<T.Mesh
	scale={3}
	onpointerenter={onPointerEnter}
	onpointerleave={onPointerLeave}
	onclick={handleClicked}
>
	<T.IcosahedronGeometry />
	<T.MeshPhysicalMaterial color={color}
													transmission={1}
													roughness={$roughness}
													side={DoubleSide}
	/>
</T.Mesh>
</Float>
