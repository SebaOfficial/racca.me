<script lang="ts">
	import { onMount } from 'svelte';
	import { commands, Terminal, type AvailableCommands } from '$lib/terminal';
	import System from '$lib/terminal/System';

	const { initCmd }: { initCmd: AvailableCommands } = $props();

	let terminalElement: HTMLDivElement;
	let terminal = new Terminal(new System('seba', 'racca.me'), commands);

	onMount(() => {
		terminal.init({ htmlElement: terminalElement, initCmd });
	});
</script>

<div
	id="terminal"
	class="min-h-screen w-screen bg-black p-1 font-mono text-default"
	bind:this={terminalElement}
></div>
