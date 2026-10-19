<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { dev } from '$app/env';
	import { BASE_URL } from '$app/env/public';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link
		rel="alternate"
		href={`${BASE_URL}/llms.txt`}
		type="text/plain"
		title="AI-readable site overview"
	/>
</svelte:head>

{@render children()}

{#if !dev}
	<script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
{/if}
