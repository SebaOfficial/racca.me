import { projects, posts } from '#lib/server/blog.ts';
import { projects as githubProjects } from '#lib/server/github.ts';

export const load = () => {
	return { projects, posts, githubProjects };
};
