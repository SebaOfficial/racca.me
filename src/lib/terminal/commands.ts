import type { Command } from './types';
import FileSystem from './FileSystem';
import System from './System';
import { compile } from 'mdsvex';

function defineCommand<T extends string>(cmd: Command & { name: T }) {
	return cmd;
}

const welcome = defineCommand({
	name: 'welcome',
	description: 'Display the welcome message',
	execute() {
		return 'Welcome to The terminal!\nType "help" to see available commands.';
	}
});

const help = defineCommand({
	name: 'help',
	description: 'List all commands',
	execute({ terminal }): string {
		const commands = terminal.getCommands();

		return `Available commands:\n${commands
			.reduce((acc, cmd) => {
				acc.push(`- ${cmd.name}${cmd.description ? `: ${cmd.description}` : ''}`);
				return acc;
			}, [] as string[])
			.join('\n')}`;
	}
});

const clear = defineCommand({
	name: 'clear',
	description: 'Clear the terminal screen',
	execute({ terminal }): void {
		terminal.clear();
	}
});

const cd = defineCommand({
	name: 'cd',
	description: 'Change the current directory',
	async execute({ args }): Promise<void> {
		await System.chdir(args[0] || '~');
	}
});

const ls = defineCommand({
	name: 'ls',
	description: 'List files and directories in the current directory',
	execute({ terminal }) {
		const items = FileSystem.listDirectory(System.getcwd());
		items.forEach((file) =>
			terminal.writeLine({
				text: file.path,
				format: file.type === 'file' ? 'default' : 'secondary'
			})
		);
	}
});

const cat = defineCommand({
	name: 'cat',
	description: 'Display the contents of a file',
	execute({ args }) {
		return FileSystem.read(System.getcwd() + '/' + args[0]);
	}
});

const render = defineCommand({
	name: 'render',
	description: 'Display the contents of a file as HTML using mdsvex',
	async execute({ args, terminal }) {
		console.log(System.getcwd(), args[0]);
		const content = FileSystem.read(args[0]);
		const html = await compile(content || '<empty file>');

		if (!html || !html.code) {
			throw new Error('Failed to render the file.');
		}

		terminal.writeLine(`<article class="terminal-markdown">${html.code}</article>`, { html: true });
	}
});

export const commandsTuple = [welcome, help, ls, cd, clear, cat, render] as const;

export const commands: Command[] = [...commandsTuple];

export default commands;
