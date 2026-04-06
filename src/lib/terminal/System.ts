import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { page } from '$app/state';
import { getLogger } from '@logtape/logtape';

export default class System {
	private logger = getLogger(['sys']);

	/**
	 * @param user The virtual username of the system. This is used in the terminal prompt and can be set to any string.
	 * @param hostname The virtual hostname of the system. This is used in the terminal prompt and can be set to any string.
	 */
	public constructor(
		private readonly user: string,
		private readonly hostname: string
	) {
		this.logger.info(`System initialized with user: ${user} and hostname: ${hostname}`);
	}

	/**
	 * @returns The virtual hostname of the system.
	 */
	public getHostname() {
		return this.hostname;
	}

	/**
	 * @returns The virtual username of the system.
	 */
	public getUser() {
		return this.user;
	}

	/**
	 * Change the process's working directory to `path`.
	 *
	 * @param path The new working directory. If `path` is `~` or `/`, the working directory will be changed to the root directory.
	 */
	public static async chdir(path: string) {
		const normalizedPath = path
			.trim()
			.replace(/^~\/?/, '')
			.replace(/^\/+|\/+$/g, '');
		const destination = '/(terminal)' + (normalizedPath.length > 0 ? `/${normalizedPath}` : '');

		await goto(resolve(destination as Parameters<typeof resolve>[0]));
	}

	/**
	 * Get the pathname of the current working directory.
	 */
	public static getcwd() {
		return page.url.pathname.replace('/', '~/');
	}
}
