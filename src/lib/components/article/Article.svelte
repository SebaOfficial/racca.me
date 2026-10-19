<script lang="ts">
	import s from '#lib/strings.ts';
	import BreadCrumbs from './BreadCrumbs.svelte';
	import SvelteSeo from 'svelte-seo';
	import { BASE_URL } from '$app/env/public';

	type Props = {
		title: string;
		description: string;
		created?: Date;
		updated?: Date;
		content: string;
		type: 'project' | 'post';
		slug: string;
		repository?: string;
		link?: string;
	};

	const { title, description, created, updated, content, type, slug, repository, link }: Props =
		$props();

	const t = $derived(type == 'post' ? 'blog' : 'projects');

	const canonical = $derived(`${BASE_URL}/${t}/${slug}`);
	const jsonLd = $derived(
		type === 'post'
			? {
					'@context': 'https://schema.org' as const,
					'@type': 'BlogPosting' as const,
					headline: title,
					name: title,
					description,
					url: canonical,
					author: {
						'@type': 'Person' as const,
						name: 'Sebastiano Racca',
						url: BASE_URL,
					},
					...(created && { datePublished: created.toISOString() }),
					...(updated && { dateModified: updated.toISOString() }),
				}
			: {
					'@context': 'https://schema.org' as const,
					'@type': 'SoftwareSourceCode' as const,
					name: title,
					description,
					url: canonical,
					author: {
						'@type': 'Person' as const,
						name: 'Sebastiano Racca',
						url: BASE_URL,
					},
					...(repository && { codeRepository: repository }),
					...(link && { sameAs: link }),
				},
	);
</script>

<SvelteSeo
	title={`${title} | ${s.header.name}`}
	{description}
	{canonical}
	{jsonLd}
	openGraph={{
		title: `${title} | ${s.header.name}`,
		description: description,
		url: canonical,
		type: type === 'post' ? 'article' : 'website',
		...(type === 'post' && {
			article: {
				author: ['Sebastiano Racca'],
				...(created && { published_time: created.toISOString() }),
				...(updated && { modified_time: updated.toISOString() }),
			},
		}),
	}}
/>

<main class="mx-auto max-w-3xl px-6 py-12 md:px-12 md:py-16">
	<BreadCrumbs
		path={[
			{
				label: 'Home',
				url: '/',
			},
			{
				label: t,
				url: `/#${t}`,
			},
			{
				label: title,
			},
		]}
	/>

	<article class="prose mt-10 max-w-none prose-invert">
		<h1>{title}</h1>
		{#if created}
			<p class="not-prose text-sm text-slate-400">
				{created.toLocaleDateString('en-US', { dateStyle: 'long' })}
			</p>
		{/if}
		<div class="mt-8">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html content}
		</div>
	</article>
</main>
