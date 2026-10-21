<script lang="ts">
	import type { BlogPost, BlogProject } from '#lib/blog.d.ts';
	import s from '#lib/strings.ts';
	import commands from '#lib/terminal/commands.ts';
	import {
		genFileSystem,
		isTerminalComponentOutput,
		System,
		Terminal,
		type TerminalOutput,
	} from '#lib/terminal/index.ts';
	import { onMount, tick } from 'svelte';
	import Prompt from './Prompt.svelte';

	type Props = {
		posts: BlogPost[];
		projects: BlogProject[];
	};

	const { posts, projects }: Props = $props();

	let output = $state<TerminalOutput[]>([]);
	let input = $state('');
	let cwd = $state('');

	let inputElement: HTMLInputElement | undefined = $state(undefined);
	let terminalElement: HTMLDivElement;

	const display = {
		write: (value: string | TerminalOutput) => {
			output = [
				...output,
				typeof value === 'string'
					? {
							txt: value,
							options: { format: 'default', isHtml: false },
						}
					: value,
			];
		},
		clear: () => {
			output = [];
		},
	};

	const terminal = new Terminal(new System('seba', 'racca.me'), display, commands, 'welcome');

	onMount(() => {
		terminal.init(genFileSystem(posts, projects));
		cwd = terminal.system.getcwd();
	});

	const onclick = (e: MouseEvent) => {
		if (!(e.target instanceof Element)) return;

		if (e.target.closest('a, button, input, textarea, select, [contenteditable="true"]')) {
			return;
		}

		inputElement?.focus();
	};

	const submitCommand = async () => {
		const command = input;
		input = '';

		await terminal.exec(command);
		cwd = terminal.system.getcwd();

		await tick();

		terminalElement.scrollTop = terminalElement.scrollHeight;
		inputElement?.focus();
	};

	const onkeydown = (e: KeyboardEvent) => {
		if (e.isComposing) return;

		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			e.preventDefault();
			input = terminal.navigateHistory(e.key === 'ArrowUp' ? 'up' : 'down');
			return;
		}

		if (e.key === 'Tab') {
			e.preventDefault();
			input = terminal.complete(input);
			return;
		}

		if (e.key !== 'Enter') return;

		e.preventDefault();
		submitCommand();
	};

	$effect(() => {
		void output.length;

		tick().then(() => {
			if (terminalElement) {
				terminalElement.scrollTop = terminalElement.scrollHeight;
			}
		});
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={terminalElement}
	id="terminal"
	{onclick}
	class="terminal mb-8 box-border h-70 w-full max-w-3xl min-w-0 overflow-x-hidden overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 font-mono text-sm text-zinc-300 shadow-2xl"
>
	<!-- Header -->
	<div
		class="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3"
	>
		<div class="flex items-center gap-2">
			<span class="h-3 w-3 rounded-full bg-red-500"></span>
			<span class="h-3 w-3 rounded-full bg-yellow-500"></span>
			<span class="h-3 w-3 rounded-full bg-green-500"></span>
		</div>

		<span class="text-xs text-zinc-500">{s.terminal.title}</span>

		<div class="w-10"></div>
	</div>

	<!-- Output -->
	<div class="w-full max-w-full min-w-0 p-4 text-white">
		<div aria-live="polite" aria-relevant="additions">
			{#each output as out, i (i)}
				{#if isTerminalComponentOutput(out)}
					{@const Component = out.component}
					<Component {...out.props} />
				{:else if out.options.isHtml}
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html out.txt}
				{:else}
					<p class={`${out.options.format} break-all whitespace-pre-wrap`}>
						{out.txt}
					</p>
				{/if}
			{/each}
		</div>

		<Prompt
			user={terminal.system.user}
			hostname={terminal.system.hostname}
			{cwd}
			bind:input
			bind:inputElement
			{onkeydown}
		/>
	</div>
</div>
