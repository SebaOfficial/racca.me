<script>
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	onMount(() => {
		window.location.replace('/#projects');
	});
</script>

<svelte:head>
	<meta http-equiv="refresh" content="0;url=/#projects" />
</svelte:head>

<p>Redirecting to <a href={resolve('/#projects')}>the projects section</a>…</p>
