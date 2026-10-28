import { getProjects, getPosts } from '#lib/server/blog.ts';
import { projects as githubProjects } from '#lib/server/github.ts';

export const load = async () => {
	const [projects, posts] = await Promise.all([getProjects(), getPosts()]);

	return { projects, posts, githubProjects };
};
