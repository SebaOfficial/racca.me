import { defineEnvVars } from '@sveltejs/kit/env';
import * as z from 'zod';

export const variables = defineEnvVars({
	BASE_URL: {
		schema: z.url(),
		public: true,
	},
	TERMINAL_HISTORY_LIMIT: {
		schema: z.string().transform((val) => Number(val)),
		public: true,
	},
	SCREENSHOT_API: {
		schema: z.url(),
	},
	GITHUB_TOKEN: {
		schema: z.string(),
	},
	GITHUB_PROJECTS_SOURCES: {
		schema: z
			.string()
			.transform((val) =>
				val.split(',').map((source) => {
					const [rawType, name] = source.trim().split('/');

					const type = rawType === 'users' ? 'user' : rawType === 'orgs' ? 'org' : rawType;

					return { type, name };
				}),
			)
			.pipe(
				z.array(
					z.object({
						type: z.enum(['user', 'org']),
						name: z.string().min(1),
					}),
				),
			),
	},
	GITHUB_PROJECTS_MIN_STARS: {
		schema: z.string().transform((val) => Number(val)),
	},
});
