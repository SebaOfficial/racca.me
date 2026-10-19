<script lang="ts">
	import type { BlogPost } from '#lib/blog.d.ts';
	import { scrollRef } from 'svelte-scrolling';
	import ArticleList from './ArticleList.svelte';
	import s from '#lib/strings.ts';

	const { posts }: { posts: BlogPost[] } = $props();
</script>

<section id="blog" use:scrollRef={'blog'}>
	<h2 class="mb-10">{s.blog.title}</h2>

	<ArticleList articles={posts} />
</section>
