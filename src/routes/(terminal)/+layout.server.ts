import type { AvailableCommands } from '$lib/terminal';

const routes = new Map<string, string>([
	['/', 'welcome'],
	['/blog/', 'welcome'],
	['/projects/', 'welcome'],
	['/blog/{slug}', 'render ~/blog/{slug}'],
	['/projects/{slug}', 'render ~/projects/{slug}'],
]);

const resolveInitCmd = (pathname: string): AvailableCommands => {
	for (const [pattern, command] of routes) {
		if (!pattern.includes('{slug}')) {
			if (pathname === pattern || pathname + '/' === pattern || pathname === pattern + '/') {
				return command as AvailableCommands;
			}
			continue;
		}

		const regex = new RegExp(`^${pattern.replace('{slug}', '([^/]+)')}/?$`);
		const match = pathname.match(regex);
		if (match) {
			const slug = match[1];
			return command.replace('{slug}', `${slug}.md`) as AvailableCommands;
		}
	}

	return 'welcome';
};

export const load = ({ url: { pathname } }) => {
	return {
		initCmd: resolveInitCmd(pathname),
	};
}
