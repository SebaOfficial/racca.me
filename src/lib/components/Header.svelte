<script lang="ts">
	import { page } from '$app/stores';
	import type { NavBarElement } from '$lib/types/SiteConfig';

	export let title: string;
	export let navBar: NavBarElement[];
</script>

<header>
	<h1>{@html title}</h1>

	<nav>
		<ul>
			{#each navBar as navElem}
				<li>
					<a
						href={navElem.href}
						title={navElem.title}
						class:active={navElem.href !== $page.url.pathname}
					>
						{@html navElem.content}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style lang="scss">
	header {
		margin-bottom: 3em;
		flex: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;

		h1 {
			font-size: 5em;
		}

		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
			overflow: hidden;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;

			li {
				float: left;

				a.active {
					color: var(--color4);

					&:hover {
						text-decoration: underline;
						text-decoration-color: var(--color5);
						text-decoration-thickness: 3px;
					}
				}
			}
		}
	}

	@media (min-width: 1024px) {
		header {
			justify-content: center;
			min-height: 100vh;
			margin-bottom: 0;
		}
	}
</style>
