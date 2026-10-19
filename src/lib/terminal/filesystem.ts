import type { BlogPost, BlogProject } from '#lib/blog.d.ts';
import type { FileSystem } from './types';

export const genFileSystem = (posts: BlogPost[], projects: BlogProject[]): FileSystem => {
	const root: FileSystem = {
		type: 'dir',
		path: '/',
		contents: [],
	};

	const files = [
		{ path: 'blog', files: posts },
		{ path: 'projects', files: projects.filter((p) => Boolean(p.content)) },
	];

	files.forEach((set) => {
		root.contents.push({
			type: 'dir',
			path: `/${set.path}`,
			contents: set.files.map((f) => {
				return {
					type: 'file',
					path: `/${set.path}/${f.slug}.md`,
					contents: f.content!,
				};
			}),
		});
	});

	return root;
};
