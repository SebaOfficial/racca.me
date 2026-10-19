export class System {
	private _PWD = '/';
	private cwd = '/';

	constructor(
		readonly user: string,
		readonly hostname: string,
	) {}

	/**
	 * Change the process's working directory to `path`.
	 *
	 * @param path The new working directory.
	 */
	chdir(path: string) {
		this._PWD = this.cwd;
		this.cwd = path.trim().replace(/^\/?/, '/');
	}

	get PWD() {
		return this._PWD;
	}

	/**
	 * @returns the pathname of the current working directory.
	 */
	getcwd() {
		return this.cwd;
	}

	resolve(path: string) {
		if (path === '-') {
			path = this.PWD;
		}

		if (path === '~') {
			path = '/';
		} else if (path.startsWith('~/')) {
			path = `/${path.slice(2)}`;
		}

		return (
			'/' +
			path
				.split('/')
				.reduce((acc, curr) => {
					if (!curr || curr === '.') return acc;
					if (curr === '..') acc.pop();
					else acc.push(curr);
					return acc;
				}, [] as string[])
				.join('/')
		);
	}
}
