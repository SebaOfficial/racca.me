<script lang="ts">
	import { dev } from '$app/environment';
	import Header from '$lib/components/Header.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { onMount } from 'svelte';

	export let data;

	let showBanner: boolean = false;

	onMount(() => {
		showBanner = Boolean(+(localStorage.getItem('show.banner') || '1'));
	});

	const closeBanner = () => {
		showBanner = false;
		localStorage.setItem('show.banner', '0');
	};
</script>

<SEO seo={data.page.seo} />

<div id="app">
	<Header title={data.page.title} navBar={data.navBar} />

	<main>
		<div class="wrapper">
			<slot />
		</div>
	</main>
</div>

{#if !dev}
	<script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
	<script async src="https://scripts.simpleanalyticscdn.com/auto-events.js"></script>
{/if}

{#if showBanner}
	<div class="banner">
		Check this out: <code>curl https://racca.me</code>, something cool happens! 🎉
		<button class="close-btn" onclick={closeBanner} title="Close">&times;</button>
	</div>
{/if}

<style lang="scss">
	#app {
		display: flex;
		min-height: 100vh;
		transition:
			color 0.5s,
			background-color 0.5s;
		font-family:
			Inter,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Fira Sans',
			'Droid Sans',
			'Helvetica Neue',
			sans-serif;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		flex-flow: column wrap;
		justify-content: center;
		align-items: center;

		main {
			min-height: 80vh;
			flex: 3;
			display: flex;
			flex-direction: column;
			align-items: center;

			.wrapper {
				max-width: 500px;
				margin: 0 30px 30px 30px;
			}
		}
	}

	.banner {
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #0078d7;
		color: #fff;
		text-align: center;
		padding: 10px 0;
		font-size: 16px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		z-index: 1000;

		button {
			background-color: inherit;
			border: none;
			color: inherit;
			font-size: x-large;
			cursor: pointer;
		}
	}

	@media (min-width: 1024px) {
		#app {
			flex-flow: row nowrap;
			justify-content: space-evenly;
			align-items: center;

			main {
				justify-content: center;
			}
		}

		.banner {
			display: block;
		}
	}
</style>
