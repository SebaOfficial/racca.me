import type { System } from './system';
import type { Component } from 'svelte';

export type { AvailableCommands } from './commands';

export type FileSystem = {
	/** absolute path to the file */
	path: string;
} & (
	| {
			type: 'dir';
			contents: FileSystem[];
	  }
	| {
			type: 'file';
			contents: string;
	  }
);

export interface CommandContext {
	display: Display;
	commands: Commands;
	system: System;
	args: string[];
	raw: string;
}

export interface Command {
	description: string;

	execute(context: CommandContext): void | Promise<void>;
}

export type Commands = ReadonlyMap<string, Command>;

export type TerminalOutputFormat = 'default' | 'secondary' | 'success' | 'error';

type TerminalOutputOptions = {
	options: {
		format: TerminalOutputFormat;
		isHtml: boolean;
	};
};

export type TerminalTextOutput = TerminalOutputOptions & {
	txt: string;
};

export type TerminalComponentOutput = TerminalOutputOptions & {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: Component<any, any, any>;
	props?: Record<string, unknown>;
};

export type TerminalOutput = TerminalTextOutput | TerminalComponentOutput;

export type TerminalDisplayOutput = string | TerminalOutput;

export function isTerminalComponentOutput(
	output: TerminalOutput,
): output is TerminalComponentOutput {
	return 'component' in output;
}

export abstract class Display {
	public abstract write(output: TerminalDisplayOutput): void;
	public abstract clear(): void;
}
