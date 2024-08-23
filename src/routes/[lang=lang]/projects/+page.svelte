<script lang="ts">
	export let data;
</script>

<div class="wrapper">
	<h2>{data.page.contents.title}</h2>
	<div class="list">
		{#each data.repos as repo}
			<div itemscope itemtype="http://schema.org/SoftwareSourceCode" class="repository">
				<h3>
					<a
						itemprop="codeRepository"
						class="active"
						href="https://github.com/{repo.full_name}"
						title="{repo.name} Repository"
						target="_blank"
						rel="noreferrer">{repo.full_name}</a
					>
				</h3>
				<p itemprop="description">{repo.description}</p>
				<span class="star">
					<span>&#9733;</span>
					{repo.stargazers_count}
					{repo.stargazers_count == 1
						? data.page.contents.star.singular
						: data.page.contents.star.plural}
				</span>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.wrapper {
		h2 {
			text-align: center;
			margin-bottom: 20px;
		}

		> div {
			height: 35em;
			overflow: auto;
		}

		.repository {
			padding: 1em;
			background-color: rgba(176, 176, 176, 0.18);
			margin: 1em;
			border-radius: 15px;
		}

		.star {
			color: #6b4500;

      span {
        font-size: large;
        font-weight: bold;
      }
		}

		.list {
			scrollbar-width: thin;
			scrollbar-color: #999 #333;

			&::-webkit-scrollbar-thumb {
				background: #999;
			}

			&::-webkit-scrollbar-track {
				background: #333;
			}

			&::-webkit-scrollbar {
				height: 10px;
				width: 10px;
			}
		}
	}

	@media (prefers-color-scheme: dark) {
		.wrapper .star {
			color: #ffa500;
		}
	}

	@media (min-width: 1024px) {
		.wrapper {
			margin: 0;
		}
	}
</style>
