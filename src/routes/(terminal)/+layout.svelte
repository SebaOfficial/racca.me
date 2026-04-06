<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Terminal from '$lib/components/Terminal.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Terminal initCmd={data.initCmd} />

{@render children()}
