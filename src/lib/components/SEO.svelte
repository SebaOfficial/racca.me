<script lang="ts">
	import type { PageSEO } from '$lib/types/SiteConfig';
	import { page } from '$app/stores';

	export let seo: PageSEO;

	let url = `${$page.url.protocol}//${$page.url.host}`;
	let currentPage = $page.url.pathname.split('/').filter(Boolean).slice(1);

	let preview = `${url}/img/preview${$page.url.pathname}.png`;

	let title = `${seo.title} | Sebastiano Racca`;
</script>

<svelte:head>
	<link rel="alternate" hreflang="en" href={`${url}/en/${currentPage}`} />
	<link rel="alternate" hreflang="it" href={`${url}/it/${currentPage}`} />
	<link rel="alternate" href={`${url}/en/${currentPage}`} hreflang="x-default" />

	<meta itemprop="name" content={title} />
	<meta itemprop="description" content={seo.description} />
	<meta itemprop="image" content={preview} />

	<meta name="description" content={seo.description} />

	<title>{title}</title>

	<!-- OG -->
	<meta property="og:site_name" content={title} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:type" content="website" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1280" />
	<meta property="og:image:height" content="800" />
	<meta property="og:image" content={preview} />

	<!-- TWITTER -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content={preview} />
</svelte:head>
