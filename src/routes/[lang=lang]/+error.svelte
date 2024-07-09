<script lang="ts">
	import { page } from '$app/stores';

	export let data;
</script>

{#if $page.status === 404}
	<div class="notFound">
		<div>
			<img src="/svg/not-found.svg" alt="Not Found" />
			<h2>{data.page.contents.title}</h2>
		</div>

		<div style="margin-left: 20px;">
			<p>{data.page.contents.description}, Sebastiano is Never gonna give you up,</p>
			<p>Never gonna let you down,</p>
			<p>Never gonna run around and desert you,</p>
			<p>Never gonna make you cry,</p>
			<p>Never gonna say goodbye,</p>
			<p>Never gonna tell a lie and hurt you.</p>
		</div>
	</div>
{:else}
	<div>
		{$page.error?.message}
	</div>
{/if}

<style lang="scss">
	.notFound {
		div:first-child {
			display: flex;
			flex-direction: row;
			align-items: center;

			img {
				max-width: 100px;
				max-height: 100px;
			}
		}

		div:nth-child(2) {
			margin-left: 20px;
		}
	}
</style>
