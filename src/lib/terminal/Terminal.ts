import type { TerminalOutputFormat, Command, AvailableCommands } from './types';
import { getLogger } from '@logtape/logtape';
import History from './History';
import System from './System';

const outputClassByFormat: Record<TerminalOutputFormat, string> = {
	default: 'text-default',
	secondary: 'text-secondary',
	success: 'text-success',
	error: 'text-error'
};

type WriteLinePart = string | { text: string; format: TerminalOutputFormat };
type WriteLineOptions = { html?: boolean };

function isWriteLineOptions(
	value: WriteLinePart | WriteLineOptions | undefined
): value is WriteLineOptions {
	return typeof value === 'object' && value !== null && 'html' in value;
}

export default class Terminal {
	public readonly history: History = new History();
	private readonly logger = getLogger(['terminal']);
	private htmlElement?: HTMLDivElement;
	private lastInputElement?: HTMLSpanElement;
	private commands: Map<AvailableCommands, Command> = new Map();

	constructor(
		private readonly system: System,
		commands: Command[]
	) {
		this.registerCommands(commands);
	}

	/**
	 * Register a command to the terminal. Registered commands can be executed by the user through the terminal prompt.
	 * @param command The command to be registered
	 */
	registerCommand(command: Command) {
		this.logger.info(`Registering command: ${command.name}`);
		this.commands.set(command.name as AvailableCommands, command);
	}

	/**
	 * Register multiple commands to the terminal. Registered commands can be executed by the user through the terminal prompt.
	 * @param commands The commands to be registered
	 */
	registerCommands(commands: Command[]) {
		commands.forEach(this.registerCommand.bind(this));
	}

	/**
	 * Initialize the terminal. This method should be called after the DOM elements have been created.
	 * @param htmlElement The root HTML element of the terminal. The terminal will attach itself to this element and render the prompt and output inside it.
	 * @param initCmd The initial command to execute.
	 */
	init({ htmlElement, initCmd }: { htmlElement: HTMLDivElement; initCmd: AvailableCommands }) {
		this.logger.info('Initializing terminal');
		this.logger.info('Attaching terminal to DOM');
		this.htmlElement = htmlElement;

		this.executeCommand(initCmd, { disableInput: true, history: false });

		this.logger.info('Terminal initialized');
	}

	/**
	 * @returns The terminal prompt's string
	 */
	getPrompt() {
		return `${this.system.getUser()}@${this.system.getHostname()}:${System.getcwd()}$ `;
	}

	/**
	 * Render the terminal prompt in the DOM. This should be called after initializing the terminal and after executing any command.
	 */
	printPrompt() {
		const container = document.createElement('div');
		container.className = 'flex flex-row gap-2 items-start';

		const promptElement = document.createElement('span');
		promptElement.textContent = this.getPrompt();
		promptElement.className = 'text-prompt flex-shrink-0';

		this.lastInputElement = document.createElement('span');
		this.lastInputElement.contentEditable = 'plaintext-only';
		this.lastInputElement.className = 'flex-1 outline-none focus:ring-0';
		this.lastInputElement.spellcheck = false;
		this.lastInputElement.autofocus = true;

		this.lastInputElement.addEventListener('keydown', this.onkeydown.bind(this));

		container.appendChild(promptElement);
		container.appendChild(this.lastInputElement);

		this.htmlElement?.appendChild(container);

		// Focus after mount so the browser can place the caret reliably.
		queueMicrotask(() => {
			if (!this.lastInputElement) {
				return;
			}

			this.lastInputElement.focus();
			this.placeCaretAtEnd(this.lastInputElement);
		});
	}

	private placeCaretAtEnd(element: HTMLElement) {
		const selection = window.getSelection();
		if (!selection) {
			return;
		}

		const range = document.createRange();
		range.selectNodeContents(element);
		range.collapse(false);
		selection.removeAllRanges();
		selection.addRange(range);
	}

	/**
	 * Handle keydown events on the terminal input. This method is responsible for executing commands when the user presses Enter and navigating through the command history when the user presses the up and down arrow keys.
	 * @param e The keyboard event
	 */
	onkeydown(e: KeyboardEvent) {
		if (!this.lastInputElement) return;

		if (e.key === 'Enter') {
			e.preventDefault();
			this.executeCommand((this.lastInputElement.textContent || '').trim());
		} else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			e.preventDefault();
			this.lastInputElement.textContent =
				this.history.navigate(e.key === 'ArrowUp' ? 'up' : 'down') || '';
			this.placeCaretAtEnd(this.lastInputElement);
		}
	}

	/**
	 *
	 * @param command The command to be executed
	 * @param options An options object that can be used to configure the command execution. If `disableInput` is `true`, the last input element will be disabled. If `history` is `true`, the command will be added to the terminal history.
	 */
	async executeCommand(
		command: AvailableCommands | string,
		options: { disableInput?: boolean; history?: boolean } = { disableInput: true, history: true }
	) {
		if (options.disableInput && this.lastInputElement) {
			this.lastInputElement.contentEditable = 'false';
		}

		if (command == '') {
			this.printPrompt();
			return;
		}

		if (options.history) {
			this.history.append(command);
		}

		this.logger.info(`Executing command: ${command}`);

		const [cmdName, ...args] = command.split(' ');

		const cmd = this.commands.get(cmdName as AvailableCommands);

		try {
			if (!cmd) {
				throw new Error(`Command not found: ${command}`);
			}

			const result = await cmd.execute({ terminal: this, args, raw: command });
			if (typeof result === 'string' && result.length > 0) {
				this.writeLine(result);
			}
		} catch (err) {
			this.logger.error(`Command execution failed: ${(err as Error).message}`, { error: err });
			const message = err instanceof Error ? err.message : String(err);
			this.writeLine({ text: `Error: ${message}`, format: 'error' });
		} finally {
			this.printPrompt();
		}
	}

	/**
	 * Write a line of text to the terminal output. This will create a new line in the terminal output and write the given text to it.
	 * @param texts The text(s) to be written. Each text can be a string or an object containing the text and its format. If the format is not specified, it will default to 'default'.
	 */
	writeLine(...args: Array<WriteLinePart | WriteLineOptions>) {
		const defaultOptions: WriteLineOptions = { html: false };
		const maybeOptions = args[args.length - 1];
		const options = isWriteLineOptions(maybeOptions)
			? { ...defaultOptions, ...maybeOptions }
			: defaultOptions;
		const texts = isWriteLineOptions(maybeOptions)
			? (args.slice(0, -1) as WriteLinePart[])
			: (args as WriteLinePart[]);

		if (texts.length === 0) {
			return;
		}

		const line = document.createElement('div');

		if (!options.html) {
			line.style.whiteSpace = 'pre-wrap';
		}

		texts.forEach((text) => {
			const format = typeof text == 'string' ? 'default' : text.format;
			const span = document.createElement('span');
			span.className = outputClassByFormat[format];
			const txt = typeof text == 'string' ? text : text.text;
			if (options.html) {
				span.innerHTML = txt;
			} else {
				span.textContent = txt;
			}
			line.appendChild(span);
		});

		this.htmlElement?.appendChild(line);
	}

	/**
	 * Clear the terminal output. This will remove all output elements from the terminal, but will not clear the command history or reset the current working directory.
	 */
	clear() {
		this.htmlElement?.replaceChildren();
	}

	/**
	 * @return An array of registered commands in the terminal.
	 */
	getCommands() {
		return Array.from(this.commands.values());
	}
}
