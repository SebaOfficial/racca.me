<script lang="ts">
	import s from '#lib/strings.ts';
	import { resolve } from '$app/paths';

	const { contentID = '#content' }: { contentID?: `#${string}` } = $props();
</script>

<a
	class="no-style absolute top-0 left-0 block -translate-x-full rounded bg-yellow-500 px-4 py-3 text-sm font-bold tracking-widest text-slate-900 uppercase focus-visible:translate-x-0 focus-visible:text-slate-900"
	{...{ href: `${resolve('/')}#${contentID.slice(1)}` }}
>
	{s.skipToContent}
</a>
