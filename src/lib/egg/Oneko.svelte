<svelte:options runes />

<script>
	import { onMount, onDestroy } from 'svelte';

	// Props
	export let catImage = './oneko.gif';

	// Reduced motion check
	let isReducedMotion = false;

	// State variables
	let nekoPosX = $state(32);
	let nekoPosY = $state(32);
	let mousePosX = $state(0);
	let mousePosY = $state(0);
	let backgroundPosition = $state('0px 0px');

	// Animation state
	let frameCount = 0;
	let idleTime = 0;
	let idleAnimation = null;
	let idleAnimationFrame = 0;
	let animationId = null;
	let lastFrameTimestamp = null;

	const nekoSpeed = 10;
	const spriteSets = {
		idle: [[-3, -3]],
		alert: [[-7, -3]],
		scratchSelf: [
			[-5, 0],
			[-6, 0],
			[-7, 0]
		],
		scratchWallN: [
			[0, 0],
			[0, -1]
		],
		scratchWallS: [
			[-7, -1],
			[-6, -2]
		],
		scratchWallE: [
			[-2, -2],
			[-2, -3]
		],
		scratchWallW: [
			[-4, 0],
			[-4, -1]
		],
		tired: [[-3, -2]],
		sleeping: [
			[-2, 0],
			[-2, -1]
		],
		N: [
			[-1, -2],
			[-1, -3]
		],
		NE: [
			[0, -2],
			[0, -3]
		],
		E: [
			[-3, 0],
			[-3, -1]
		],
		SE: [
			[-5, -1],
			[-5, -2]
		],
		S: [
			[-6, -3],
			[-7, -2]
		],
		SW: [
			[-5, -3],
			[-6, -1]
		],
		W: [
			[-4, -2],
			[-4, -3]
		],
		NW: [
			[-1, 0],
			[-1, -1]
		]
	};

	function handleMouseMove(event) {
		mousePosX = event.clientX;
		mousePosY = event.clientY;
	}

	function setSprite(name, frame) {
		const sprite = spriteSets[name][frame % spriteSets[name].length];
		backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
	}

	function resetIdleAnimation() {
		idleAnimation = null;
		idleAnimationFrame = 0;
	}

	function idle() {
		idleTime += 1;

		// every ~ 20 seconds
		if (idleTime > 10 && Math.floor(Math.random() * 200) == 0 && idleAnimation == null) {
			let availableIdleAnimations = ['sleeping', 'scratchSelf'];
			if (nekoPosX < 32) {
				availableIdleAnimations.push('scratchWallW');
			}
			if (nekoPosY < 32) {
				availableIdleAnimations.push('scratchWallN');
			}
			if (nekoPosX > window.innerWidth - 32) {
				availableIdleAnimations.push('scratchWallE');
			}
			if (nekoPosY > window.innerHeight - 32) {
				availableIdleAnimations.push('scratchWallS');
			}
			idleAnimation =
				availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
		}

		switch (idleAnimation) {
			case 'sleeping':
				if (idleAnimationFrame < 8) {
					setSprite('tired', 0);
					break;
				}
				setSprite('sleeping', Math.floor(idleAnimationFrame / 4));
				if (idleAnimationFrame > 192) {
					resetIdleAnimation();
				}
				break;
			case 'scratchWallN':
			case 'scratchWallS':
			case 'scratchWallE':
			case 'scratchWallW':
			case 'scratchSelf':
				setSprite(idleAnimation, idleAnimationFrame);
				if (idleAnimationFrame > 9) {
					resetIdleAnimation();
				}
				break;
			default:
				setSprite('idle', 0);
				return;
		}
		idleAnimationFrame += 1;
	}

	function frame() {
		frameCount += 1;
		const diffX = nekoPosX - mousePosX;
		const diffY = nekoPosY - mousePosY;
		const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

		if (distance < nekoSpeed || distance < 48) {
			idle();
			return;
		}

		idleAnimation = null;
		idleAnimationFrame = 0;

		if (idleTime > 1) {
			setSprite('alert', 0);
			// count down after being alerted before moving
			idleTime = Math.min(idleTime, 7);
			idleTime -= 1;
			return;
		}

		let direction;
		direction = diffY / distance > 0.5 ? 'N' : '';
		direction += diffY / distance < -0.5 ? 'S' : '';
		direction += diffX / distance > 0.5 ? 'W' : '';
		direction += diffX / distance < -0.5 ? 'E' : '';
		setSprite(direction, frameCount);

		nekoPosX -= (diffX / distance) * nekoSpeed;
		nekoPosY -= (diffY / distance) * nekoSpeed;

		nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
		nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);
	}

	function onAnimationFrame(timestamp) {
		if (!lastFrameTimestamp) {
			lastFrameTimestamp = timestamp;
		}
		if (timestamp - lastFrameTimestamp > 100) {
			lastFrameTimestamp = timestamp;
			frame();
		}
		animationId = window.requestAnimationFrame(onAnimationFrame);
	}

	onMount(() => {
		isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (isReducedMotion) return;

		document.addEventListener('mousemove', handleMouseMove);
		animationId = window.requestAnimationFrame(onAnimationFrame);
	});

	onDestroy(() => {
		if (!isReducedMotion) {
			document.removeEventListener('mousemove', handleMouseMove);
			if (animationId) {
				window.cancelAnimationFrame(animationId);
			}
		}
	});
</script>

{#if !isReducedMotion}
	<div
		id="oneko"
		aria-hidden="true"
		style:width="32px"
		style:height="32px"
		style:position="fixed"
		style:pointer-events="none"
		style:image-rendering="pixelated"
		style:left={`${nekoPosX - 16}px`}
		style:top={`${nekoPosY - 16}px`}
		style:z-index="2147483647"
		style:background-image={`url(${catImage})`}
		style:background-position={backgroundPosition}
	/>
{/if}
