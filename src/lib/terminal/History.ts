import { PUBLIC_HISTORY_LIMIT } from '$env/static/public';
import { getLogger } from '@logtape/logtape';

export default class History {
	private history: string[] = [];
	private HISTORY_LIMIT: number = Number(PUBLIC_HISTORY_LIMIT);
	private index: number = 0;
	private logger = getLogger(['history']);

	append(command: string) {
		this.logger.info(`Appending command to history: ${command}`);
		if (this.history.length >= this.HISTORY_LIMIT) {
			this.history.shift();
		}

		this.history.push(command);
		this.index = this.history.length;
	}

	navigate(direction: 'up' | 'down'): string {
		if (this.history.length === 0) {
			return '';
		}

		if (direction === 'up') {
			this.index = Math.max(this.index - 1, 0);
		} else {
			this.index = Math.min(this.index + 1, this.history.length);
		}

		if (this.index === this.history.length) {
			return '';
		}

		return this.history[this.index] ?? '';
	}
}
