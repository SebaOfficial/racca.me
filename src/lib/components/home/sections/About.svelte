<script lang="ts">
	import { scrollRef } from 'svelte-scrolling';
	import s from '#lib/strings.ts';
</script>

<section
	use:scrollRef={'about'}
	id="about"
	class="scroll-mt-16 md:mb-4 lg:mb-8 lg:scroll-mt-24 lg:pt-2"
>
	{#each s.home.about as p (p)}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<p itemprop="description" class="mb-4">{@html p}</p>
	{/each}
</section>
