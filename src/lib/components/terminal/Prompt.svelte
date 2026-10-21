<script lang="ts">
	import s from '#lib/strings.ts';

	type Props = {
		user: string;
		hostname: string;
		cwd: string;
		inputElement?: HTMLInputElement;
		input?: string;
		command?: string;
		onkeydown?: (e: KeyboardEvent) => void;
	};
	let {
		user,
		hostname,
		cwd,
		inputElement = $bindable(),
		input = $bindable(),
		command,
		onkeydown,
	}: Props = $props();
</script>

<div class="flex items-baseline gap-1">
	<span class="shrink-0 text-emerald-400">
		<!-- Disable Cloudflare's email obfuscation -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html '<!--email_off-->'}{user}@{hostname}{@html '<!--/email_off-->'}
	</span>

	<span class="shrink-0">:</span>

	<span class="shrink-0 text-sky-400">{cwd}</span>

	<span class="shrink-0 text-zinc-400">$</span>

	{#if command !== undefined}
		<span class="min-w-0 flex-1 break-all whitespace-pre-wrap text-white">{command}</span>
	{:else}
		<input
			bind:this={inputElement}
			bind:value={input}
			{onkeydown}
			type="text"
			aria-label={s.terminal.label}
			autocomplete="off"
			autocapitalize="off"
			spellcheck="false"
			class="min-w-0 flex-1 border-0 bg-transparent p-0 text-white outline-none focus-visible:ring-0"
		/>
	{/if}
</div>
