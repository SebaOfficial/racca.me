<!-- eslint-disable svelte/no-navigation-without-resolve -->
<script lang="ts">
	import s from '#lib/strings.ts';
	import type { BlogPost, BlogProject } from '#lib/blog.d.ts';
	import { resolve } from '$app/paths';
	import {
		ArrowRightOutline,
		ArrowUpRightFromSquareOutline,
		GithubSolid,
	} from 'flowbite-svelte-icons';

	const { articles }: { articles: (BlogPost | BlogProject)[] } = $props();
</script>

<ul class="group/list" itemscope itemtype="https://schema.org/ItemList">
	{#each articles as article (article.slug)}
		{@const articleHref =
			article.type == 'project' ? article.link : resolve('/blog/[slug]', { slug: article.slug })}
		<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="mb-12">
			<meta itemprop="position" content={String(articles.indexOf(article) + 1)} />
			<article
				itemprop="item"
				itemscope
				itemtype={article.type == 'project'
					? 'https://schema.org/CreativeWork'
					: 'https://schema.org/BlogPosting'}
				class="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:opacity-100!"
			>
				<div
					class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"
				></div>
				<div class="z-10 sm:order-2 sm:col-span-6">
					<h3>
						<a
							itemprop="url"
							class="group/link inline-flex items-baseline text-base leading-tight font-medium text-slate-200"
							{...{ href: articleHref }}
							target={article.type == 'project' ? '_blank' : undefined}
							rel={article.type == 'project' ? 'external' : undefined}
							aria-label={article.type == 'project' ? s.openExternalLink(article.title) : undefined}
						>
							<span>
								<span itemprop={article.type == 'project' ? 'name' : 'headline'}
									>{article.title}</span
								>
								{#if article.type == 'project'}
									({new URL(article.link).host})
									<ArrowUpRightFromSquareOutline
										aria-hidden="true"
										size="sm"
										class="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-focus-visible/link:translate-x-1 group-focus-visible/link:-translate-y-1 motion-reduce:transition-none"
									/>
								{/if}
							</span>
						</a>
					</h3>
					<div>
						<p itemprop="description" class="mt-2 text-sm leading-normal">{article.description}</p>
						{#if article.content}
							<a
								href={resolve(`/${article.type == 'project' ? 'projects' : 'blog'}/[slug]`, {
									slug: article.slug,
								})}
								class="group/link text-sm leading-normal"
							>
								{s.learnMore(article.type === 'project' ? 'project' : 'post')}
								<ArrowRightOutline
									aria-hidden="true"
									class="inline h-4 w-4 shrink-0 transition-all group-hover/link:translate-x-1 motion-reduce:transition-none"
								/>
							</a>
						{/if}
					</div>
				</div>

				{#if article.type == 'project'}
					<div class="z-10">
						<enhanced:img
							itemprop="image"
							src={article.preview}
							alt={s.projects.preview.alt(article.title)}
							loading="lazy"
							width="200"
							height="48"
							decoding="async"
							class="aspect-video rounded border-2 border-slate-200/10 object-cover transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
						/>
						{#if article.repository}
							<div class="mt-3 flex">
								<a
									itemprop="sameAs"
									href={article.repository}
									rel="external noreferrer noopener"
									aria-label={s.openExternalLink(s.header.socials.github)}
									target="_blank"
									title={s.header.socials.github}
								>
									<GithubSolid class="h-4 w-4 shrink-0" aria-hidden="true" size="xs" width={15} />
								</a>
							</div>
						{/if}
					</div>
				{/if}
			</article>
		</li>
	{/each}
</ul>
