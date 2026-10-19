<script lang="ts">
	import Header from '#lib/components/home/Header.svelte';
	import About from '#lib/components/home/sections/About.svelte';
	import Blog from '#lib/components/home/sections/Blog.svelte';
	import Projects from '#lib/components/home/sections/Projects.svelte';
	import Footer from '#lib/components/home/Footer.svelte';
	import SkipToContent from '#lib/components/SkipToContent.svelte';
	import Terminal from '#lib/components/terminal/Terminal.svelte';
	import { scrollRef } from 'svelte-scrolling';
	import s from '#lib/strings.ts';
	import SvelteSeo from 'svelte-seo';
	import { BASE_URL } from '$app/env/public';

	const { data } = $props();
	const projects = $derived(data.projects);
	const posts = $derived(data.posts);
	const githubProjects = $derived(data.githubProjects);
	const jsonLd = {
		'@context': 'https://schema.org' as const,
		'@type': 'Person' as const,
		name: 'Sebastiano Racca',
		url: BASE_URL,
		jobTitle: 'Software Developer',
		description: s.seo.description,
	};
</script>

<SvelteSeo
	title={s.seo.title}
	description={s.seo.description}
	canonical={BASE_URL}
	{jsonLd}
	openGraph={{
		title: s.seo.title,
		description: s.seo.description,
		url: BASE_URL,
		type: 'website',
	}}
/>

<div
	class="mx-auto min-h-screen max-w-7xl px-6 py-12 md:px-12 md:py-16 lg:py-0"
	itemscope
	itemtype="https://schema.org/Person"
>
	<SkipToContent />

	<div class="lg:flex lg:justify-between lg:gap-4">
		<Header />
		<main use:scrollRef={'content'} id="content" class="pt-24 lg:w-[52%] lg:py-24">
			<About />

			<Terminal {posts} {projects} />

			<Projects {projects} {githubProjects} />
			<Blog {posts} />
			<Footer />
		</main>
	</div>
</div>
