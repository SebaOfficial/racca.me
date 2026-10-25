<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import SvelteSeo from 'svelte-seo';
	import s from '#lib/strings.ts';

	const err = s.error[page.status as 404] || s.error.default;
</script>

<SvelteSeo title={`${err.title} | ${s.header.name}`} />

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16 sm:px-12">
	<p class="font-mono text-sm tracking-[0.2em] text-yellow-400 uppercase" aria-hidden="true">
		{page.status}
	</p>
	<h1 class="mt-4 text-4xl font-bold tracking-tight text-slate-200 sm:text-6xl">
		{err.title}
	</h1>
	<p class="mt-6 max-w-xl text-lg leading-8 text-on-background/80">
		{err.description}
	</p>
	<a
		href={resolve('/')}
		class="no-style mt-10 inline-flex w-fit rounded border border-yellow-400 px-5 py-3 font-semibold text-yellow-400 transition-colors hover:bg-yellow-400 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400 motion-reduce:transition-none"
	>
		{s.error.cta}
	</a>
</main>
