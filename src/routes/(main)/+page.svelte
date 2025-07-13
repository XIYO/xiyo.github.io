<script>
	import Card from '$lib/ui/card/Card.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import terminalBrowsing from '$lib/assets/terminal_browsing.png?enhanced';
</script>

<Card negative>
	<div class="p-4">
		<p>{m.introduction()}</p>

		<figure>
			<enhanced:img src={terminalBrowsing} alt={m.terminalBrowsing()} data-title={m.terminal()} />
			<figcaption>{m.terminalCaption()}</figcaption>
		</figure>
	</div>
</Card>
