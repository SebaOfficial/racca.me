<script>
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	onMount(() => {
		window.location.replace('/#blog');
	});
</script>

<svelte:head>
	<meta http-equiv="refresh" content="0;url=/#blog" />
</svelte:head>

<p>Redirecting to <a href={resolve('/#blog')}>the blog section</a>…</p>
