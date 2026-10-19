<script lang="ts">
	import s from '#lib/strings.ts';
	import { scrollTo } from 'svelte-scrolling';
	import { onMount } from 'svelte';

	type Nav = (typeof s.header.nav)[number];
	let activeSection = $state<Nav>(s.header.nav[0]);

	onMount(() => {
		const sections = s.header.nav
			.map((nav) => document.getElementById(nav))
			.filter((section): section is HTMLElement => section !== null);

		if (sections.length === 0) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const visibleSection = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
				const visibleNav = s.header.nav.find((nav) => nav === visibleSection?.target.id);

				if (visibleNav) {
					activeSection = visibleNav;
				}
			},
			{
				rootMargin: '-20% 0px -60% 0px',
				threshold: 0,
			},
		);

		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	});
</script>

<header
	class="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[40%] lg:flex-col lg:justify-around lg:px-15 lg:py-24"
>
	<div>
		<h1 itemprop="name" class="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
			{s.header.name}
		</h1>
		<h2 class="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<span itemprop="jobTitle">{@html s.header.title}</span>
		</h2>
		<p itemprop="description" class="mt-4 max-w-xs leading-normal">{s.header.motto}</p>
	</div>
	<nav class="nav hidden lg:block" aria-label={s.header.navLabel}>
		<ul class="mt-16 w-max">
			{#each s.header.nav as nav (nav)}
				<li>
					<a
						href="#{nav}"
						use:scrollTo={nav}
						aria-current={activeSection === nav ? 'page' : undefined}
						class="no-style group flex items-center py-3"
					>
						<span
							class="bar h-px w-10 transition-all group-hover:w-16 group-hover:bg-on-background {activeSection ===
							nav
								? 'w-16 bg-on-background'
								: 'bg-on-background/50'}"
						></span>
						<span
							class="text ml-4 transition-colors group-hover:text-on-background {activeSection ===
							nav
								? 'text-on-background'
								: 'text-on-background/90'}"
						>
							{nav.toLocaleLowerCase()}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<ul class="mt-8 flex items-center justify-center gap-5" aria-label={s.header.socials.label}>
		{#each s.header.socials.list as social (social.name)}
			<li>
				<a
					itemprop={social.name === 'Email' ? undefined : 'sameAs'}
					href={social.link}
					rel="external"
					aria-label={social.name}
					title={social.name}
				>
					<social.icon aria-hidden="true" class="shrink-0" width="30" size="md" />
				</a>
			</li>
		{/each}
	</ul>
</header>
