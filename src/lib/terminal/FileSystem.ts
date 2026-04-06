const modules = import.meta.glob('../assets/fs/**/*', {
	query: '?raw',
	eager: true,
	import: 'default'
}) as Record<string, string>;

const filePaths = Object.keys(modules).map((path) =>
	path
		.replace(/^\.\.\/assets\/fs\//, '')
		.replace(/^\.\/\.\.\/assets\/fs\//, '')
		.replace(/^\/+/, '')
);

const pathSet = new Set(filePaths);

export default class FileSystem {
	private static normalizePath(path: string): string {
		const trimmed = path.trim();
		if (!trimmed || trimmed === '/' || trimmed === '~') {
			return '';
		}

		return trimmed.replace(/^~\/?/, '').replace(/^\/+/, '').replace(/\/+$/, '');
	}

	static exists(path: string, type: 'file' | 'dir' = 'file'): boolean {
		const normalizedPath = this.normalizePath(path);

		if (normalizedPath === '') {
			return type === 'dir';
		}

		if (type === 'file') {
			return pathSet.has(normalizedPath);
		}

		const prefix = `${normalizedPath}/`;
		for (const filePath of filePaths) {
			if (filePath.startsWith(prefix)) {
				return true;
			}
		}

		return false;
	}

	static listDirectory(path: string) {
		const normalizedPath = this.normalizePath(path);
		const prefix = normalizedPath ? `${normalizedPath}/` : '';
		const entries = new Map<
			string,
			{
				path: string;
				type: 'file' | 'dir';
			}
		>();

		for (const filePath of filePaths) {
			if (!filePath.startsWith(prefix)) {
				continue;
			}

			const remainder = filePath.slice(prefix.length);
			if (!remainder) {
				continue;
			}

			const [entry] = remainder.split('/');
			if (entry) {
				const type = remainder.includes('/') ? 'dir' : 'file';
				entries.set(entry, { path: entry, type });
			}
		}

		return Array.from(entries.values()).sort((a, b) => a.path.localeCompare(b.path));
	}

	static read(path: string) {
		if (!this.exists(path, 'file')) {
			throw new Error(`File not found: ${path}`);
		}

		const normalizedPath = this.normalizePath(path);
		return modules[`../assets/fs/${normalizedPath}` as keyof typeof modules];
	}
}
