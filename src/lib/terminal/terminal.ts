import { fs, configureSingleSync } from '@zenfs/core';
import { WebStorage } from '@zenfs/dom';
import type { FileSystem, Display, Commands, AvailableCommands } from '#lib/terminal/index.ts';
import type { System } from './system';
import History from './history';
import Prompt from '#lib/components/terminal/Prompt.svelte';
import s from '#lib/strings.ts';
import { dev } from '$app/env';

export class Terminal {
	private history = new History();

	constructor(
		readonly system: System,
		private readonly display: Display,
		readonly commands: Commands,
		readonly initCmmand: Extract<AvailableCommands, string>,
	) {}

	/**
	 * @returns The terminal prompt's string
	 */
	getPrompt() {
		return `${this.system.user}@${this.system.hostname}:${this.system.getcwd()}$ `;
	}

	navigateHistory(direction: 'up' | 'down') {
		return this.history.navigate(direction);
	}

	complete(input: string) {
		const tokenStart = input.search(/\S+$/);
		const start = tokenStart === -1 ? input.length : tokenStart;
		const prefix = input.slice(0, start);
		const token = input.slice(start);
		const isCommand = prefix.trim() === '';

		const matches = isCommand
			? [...this.commands.keys()].filter((name) => name.startsWith(token))
			: this.completePath(token);

		if (matches.length === 0) return input;

		const completion = this.longestCommonPrefix(matches);
		if (matches.length === 1 && isCommand) {
			return `${prefix}${completion} `;
		}

		return `${prefix}${completion}`;
	}

	private completePath(token: string) {
		const separator = token.lastIndexOf('/');
		const directoryToken = separator === -1 ? '' : token.slice(0, separator + 1);
		const nameToken = token.slice(separator + 1);
		const directory = this.system.resolve(
			directoryToken.startsWith('/') || directoryToken.startsWith('~')
				? directoryToken
				: `${this.system.getcwd()}/${directoryToken}`,
		);

		if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) return [];

		const entries = fs.readdirSync(directory, {
			encoding: 'utf-8',
			withFileTypes: true,
		});

		return entries
			.filter((entry) => entry.name.startsWith(nameToken))
			.map((entry) => {
				const suffix = entry.isDirectory() ? '/' : '';
				return `${directoryToken}${entry.name}${suffix}`;
			});
	}

	init(root: FileSystem) {
		configureSingleSync({ backend: WebStorage });
		this.initFs(root);
		this.exec(this.initCmmand, { history: false });
	}

	private initFs(root: FileSystem) {
		if (root.type == 'file') {
			fs.writeFileSync(root.path, root.contents);
			return;
		}

		fs.mkdirSync(root.path, { recursive: true });
		root.contents.forEach((r) => this.initFs(r));
	}

	printPrompt(cmd?: string) {
		this.display.write({
			component: Prompt,
			props: {
				user: this.system.user,
				hostname: this.system.hostname,
				cwd: this.system.getcwd(),
				command: cmd ?? '',
			},
			options: { isHtml: false, format: 'default' },
		});
	}

	async exec(command: string, options: { history: boolean } = { history: true }) {
		if (command == '') {
			this.printPrompt();
			return;
		}

		if (options.history) {
			this.printPrompt(command);
		}

		const [name, ...args] = command.split(' ');

		const cmd = this.commands.get(name as AvailableCommands);

		try {
			if (!cmd) {
				throw new Error(s.terminal.errors.missingCommand(name));
			}

			await cmd.execute({
				display: this.display,
				args,
				raw: command,
				commands: this.commands,
				system: this.system,
			});

			if (options.history) {
				this.history.push(command);
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			this.display.write({
				txt: s.terminal.errors.error(message),
				options: { format: 'error', isHtml: false },
			});
		} finally {
			if (!dev && options.history) {
				window.umami.track('command', {
					raw: command,
				});
			}
		}
	}

	private longestCommonPrefix(values: string[]) {
		return values.reduce((prefix, value) => {
			let length = 0;
			while (length < prefix.length && prefix[length] === value[length]) length += 1;
			return prefix.slice(0, length);
		});
	}
}
