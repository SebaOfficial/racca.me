<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { dev } from '$app/env';
	import {
		BASE_URL,
		UMAMI_ANALYTICS_SCRIPT_URL,
		UMAMI_ANALYTICS_WEBSITE_ID,
	} from '$app/env/public';

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

	{#if !dev}
		<script
			defer
			async
			src={UMAMI_ANALYTICS_SCRIPT_URL}
			data-website-id={UMAMI_ANALYTICS_WEBSITE_ID}
			data-performance="true"
		></script>
	{/if}
</svelte:head>

{@render children()}
