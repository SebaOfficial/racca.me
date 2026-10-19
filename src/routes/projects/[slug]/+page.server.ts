import { error } from '@sveltejs/kit';
import { projects } from '#lib/server/blog.ts';
import type { PageServerLoad } from './$types';
import type { BlogProject } from '#lib/blog.js';

export const load: PageServerLoad = ({ params }) => {
	const project = projects.find(
		(item) => Boolean(item.content) && item.slug === params.slug,
	) as BlogProject & { created: Date; content: string };

	if (!project) error(404, 'Project not found');

	return { project };
};
