<script lang="ts">
	import type { GitHubRepository } from '#lib/github.d.ts';
	import { ArrowLeftOutline, ArrowRightOutline, CodeForkOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import s from '#lib/strings.ts';

	const { projects }: { projects: GitHubRepository[] } = $props();

	let viewport: HTMLDivElement;
	let track: HTMLDivElement;
	let isHovered = $state(false);
	let isFocused = $state(false);
	let prefersReducedMotion = $state(false);

	const SPEED = 35; // pixels per second
	const CARD_STEP = 336;

	function handleScroll() {
		if (!viewport || !track) return;

		const segmentWidth = track.scrollWidth / 3;

		if (viewport.scrollLeft < segmentWidth) {
			viewport.scrollLeft += segmentWidth;
		} else if (viewport.scrollLeft >= segmentWidth * 2) {
			viewport.scrollLeft -= segmentWidth;
		}
	}

	function scrollProjects(direction: -1 | 1) {
		viewport.scrollBy({ left: direction * CARD_STEP, behavior: 'smooth' });
	}

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateMotionPreference = () => (prefersReducedMotion = mediaQuery.matches);
		updateMotionPreference();
		mediaQuery.addEventListener('change', updateMotionPreference);

		viewport.scrollLeft = track.scrollWidth / 3;

		let frameId: number;
		let previousTime = 0;

		function animate(time: number) {
			if (previousTime !== 0 && !prefersReducedMotion && !isHovered && !isFocused) {
				const delta = Math.min(time - previousTime, 32);
				viewport.scrollLeft += (SPEED * delta) / 1000;
			}

			previousTime = time;
			frameId = requestAnimationFrame(animate);
		}

		frameId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(frameId);
			mediaQuery.removeEventListener('change', updateMotionPreference);
		};
	});
</script>

<div
	class="group relative overflow-hidden"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	onfocusin={() => (isFocused = true)}
	onfocusout={(event) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
			isFocused = false;
		}
	}}
	role="region"
	aria-label={s.projects.github.carousel.label}
>
	<div bind:this={viewport} onscroll={handleScroll} class="scrollbar-none overflow-x-auto">
		<div bind:this={track} class="flex w-max">
			{#each [0, 1, 2] as copy (copy)}
				<div class="flex w-max shrink-0 gap-4 pr-4" aria-hidden={copy !== 1} inert={copy !== 1}>
					{#each projects as project (project.url)}
						<div
							itemscope={copy === 1}
							itemtype={copy === 1 ? 'https://schema.org/SoftwareSourceCode' : undefined}
							class="flex min-h-48 w-80 shrink-0 flex-col
								rounded-lg border border-gray-200 p-4"
						>
							<a href={project.url} rel="external" target="_blank" class="block">
								<h4 itemprop="name" class="line-clamp-2">{project.fullName}</h4>
							</a>

							<p itemprop="description" class="mt-2 line-clamp-3 min-h-18 text-sm leading-6">
								{project.description}
							</p>

							<p class="mt-auto flex gap-3 pt-3 text-sm">
								<span
									itemprop="interactionStatistic"
									itemscope
									itemtype="https://schema.org/InteractionCounter"
									class="text-orange-500"
								>
									<meta itemprop="interactionType" content="https://schema.org/LikeAction" />
									<span aria-hidden="true">★</span>
									<span class="sr-only">{s.projects.github.stars} </span>
									<meta itemprop="userInteractionCount" content={String(project.stars)} />
									<span aria-hidden="true">{project.stars}</span>
								</span>

								<span
									itemprop="interactionStatistic"
									itemscope
									itemtype="https://schema.org/InteractionCounter"
									class="inline-flex items-center gap-1 text-on-background/90"
								>
									<meta itemprop="interactionType" content="https://schema.org/FollowAction" />
									<CodeForkOutline size="xs" />
									<span class="sr-only">{s.projects.github.forks} </span>
									<meta itemprop="userInteractionCount" content={String(project.forks)} />
									<span aria-hidden="true">{project.forks}</span>
								</span>
							</p>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div
		class="pointer-events-none absolute inset-y-0 right-0 left-0 flex items-center justify-between
			opacity-0 transition-opacity group-focus-within:pointer-events-auto group-focus-within:opacity-100
			group-hover:pointer-events-auto group-hover:opacity-100"
	>
		<button
			type="button"
			class="pointer-events-auto ml-2 cursor-pointer rounded-full bg-on-background/20 px-3 py-2 text-xl
				leading-none shadow ring-on-background focus:ring-2 focus:outline-none"
			aria-label={s.projects.github.carousel.previous}
			onclick={() => scrollProjects(-1)}
		>
			<ArrowLeftOutline size="sm" aria-hidden="true" />
		</button>
		<button
			type="button"
			class="pointer-events-auto mr-2 cursor-pointer rounded-full bg-on-background/20 px-3 py-2 text-xl
				leading-none shadow ring-on-background focus:ring-2 focus:outline-none"
			aria-label={s.projects.github.carousel.next}
			onclick={() => scrollProjects(1)}
		>
			<ArrowRightOutline size="sm" aria-hidden="true" />
		</button>
	</div>
</div>
