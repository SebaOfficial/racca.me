<script lang="ts">
	import s from '#lib/strings.ts';

	const year = new Date().getFullYear();
</script>

<footer class="mt-16 border-t border-on-background/10 py-6 text-sm text-on-background/60 lg:mt-24">
	<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
		<p>{s.footer.copyright(year)}</p>
		<p>{s.footer.attribution}</p>
	</div>
</footer>
