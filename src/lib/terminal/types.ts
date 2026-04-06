import type Terminal from './Terminal';
import { commandsTuple } from './commands';

export interface CommandContext {
	terminal: Terminal;
	args: string[];
	raw: string;
}

export interface Command {
	name: string;
	description?: string;

	execute(context: CommandContext): Promise<string | void> | string | void;
}

export interface TerminalOptions {
	prompt?: string;
	commands?: Command[];
}

export interface TerminalHtmlElements {
	prompt?: HTMLSpanElement;
	input?: HTMLInputElement;
	output?: HTMLElement;
}

export type AvailableCommands = (typeof commandsTuple)[number]['name'];

export type TerminalOutputFormat = 'default' | 'secondary' | 'success' | 'error';
