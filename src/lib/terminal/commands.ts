import type { Command } from './types';
import { fs } from '@zenfs/core';
import s from '#lib/strings.ts';

const commandDefinitions = {
	welcome: {
		description: s.terminal.commands.welcome.description,
		execute: ({ display }) => {
			s.terminal.commands.welcome.messages.forEach(display.write);
		},
	},
	help: {
		description: s.terminal.commands.help.description,
		execute: ({ display, commands }) => {
			display.write(s.terminal.commands.help.message);

			commands.entries().forEach(([name, { description }]) => {
				display.write(`- ${name}: ${description}`);
			});
		},
	},
	clear: {
		description: s.terminal.commands.clear.description,
		execute: ({ display }) => display.clear(),
	},
	cd: {
		description: s.terminal.commands.cd.description,
		execute: ({ args, system }) => {
			const path = system.resolve(args[0] || '/');

			if (!fs.existsSync(path)) throw new Error(s.terminal.errors.noSuchFileOrDirectory);
			if (!fs.statSync(path).isDirectory()) throw new Error(s.terminal.errors.notDirectory);

			system.chdir(path);
		},
	},
	ls: {
		description: s.terminal.commands.ls.description,
		execute: ({ system, display, args }) => {
			fs.readdirSync(args[0] || system.getcwd(), {
				encoding: 'utf-8',
				withFileTypes: true,
			}).forEach((file) => {
				display.write({
					txt: file.name,
					options: { format: file.isDirectory() ? 'secondary' : 'default', isHtml: false },
				});
			});
		},
	},

	cat: {
		description: s.terminal.commands.cat.description,
		execute: ({ display, args, system }) => {
			if (!args[0]) {
				display.write(s.terminal.errors.missingArgument);
				return;
			}
			const path = system.resolve(system.getcwd() + '/' + args[0]);

			if (!fs.existsSync(path))
				throw new Error(`${args[0]}: ${s.terminal.errors.noSuchFileOrDirectory}`);
			if (!fs.statSync(path).isFile()) throw new Error(`${args[0]}: ${s.terminal.errors.notFile}`);

			display.write({
				txt: fs.readFileSync(path, 'utf-8'),
				options: { format: 'default', isHtml: true },
			});
		},
	},
} as const satisfies Record<string, Command>;

export type AvailableCommands = keyof typeof commandDefinitions;

const commands = new Map<keyof typeof commandDefinitions, Command>(
	Object.entries(commandDefinitions) as [keyof typeof commandDefinitions, Command][],
);

export default commands;
