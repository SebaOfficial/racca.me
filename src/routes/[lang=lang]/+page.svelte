<script lang="ts">
	export let data;
</script>

<div itemscope itemtype="http://schema.org/Person">
	{#each data.page.contents as desc}
		<h2>{desc.title}</h2>
		<p>{desc.description}</p>
	{/each}
</div>

<style lang="scss">
	p {
		margin: 15px 0 35px 0;
	}
</style>
