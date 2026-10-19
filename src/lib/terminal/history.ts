import { TERMINAL_HISTORY_LIMIT } from '$app/env/public';

export default class History {
	private history: string[] = [];
	private index = 0;

	push(command: string) {
		if (this.history.length >= TERMINAL_HISTORY_LIMIT) {
			this.history.shift();
		}
		this.history.push(command);

		this.index = this.history.length;
	}

	navigate(direction: 'up' | 'down') {
		if (direction === 'up') {
			this.index = Math.max(this.index - 1, 0);
		} else {
			this.index = Math.min(this.index + 1, this.history.length);
		}

		return this.history[this.index] ?? '';
	}
}
