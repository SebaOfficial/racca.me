<script lang="ts">
	import type { BlogProject } from '#lib/blog.d.ts';
	import type { GitHubRepository } from '#lib/github.d.ts';
	import { scrollRef } from 'svelte-scrolling';

	import ArticleList from './ArticleList.svelte';
	import s from '#lib/strings.ts';
	import GitHubCarousel from './GitHubCarousel.svelte';

	type Props = {
		projects: BlogProject[];
		githubProjects: GitHubRepository[];
	};

	const { projects, githubProjects }: Props = $props();
</script>

<section id="projects" use:scrollRef={'projects'} class="mb-10">
	<h2 class="mb-10">{s.projects.title}</h2>

	<ArticleList articles={projects} />

	<h3 class="mb-3">{s.projects.github.title}</h3>
	<GitHubCarousel projects={githubProjects} />
</section>
