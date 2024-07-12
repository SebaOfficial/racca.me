<script lang="ts">
	import { dev } from '$app/environment';
	import Header from '$lib/components/Header.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	export let data;
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
	<script src="{PUBLIC_API_URL}/newsletter.js" defer async></script>
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

	@media (min-width: 1024px) {
		#app {
			flex-flow: row nowrap;
			justify-content: space-evenly;
			align-items: center;

			main {
				justify-content: center;
			}
		}
	}
</style>
