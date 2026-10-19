<script lang="ts">
	import Article from '#lib/components/article/Article.svelte';

	const { data } = $props();
</script>

<Article {...data.project} />
