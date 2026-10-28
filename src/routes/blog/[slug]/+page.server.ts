import { error } from '@sveltejs/kit';
import { getPosts } from '#lib/server/blog.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const posts = await getPosts();
	const post = posts.find((item) => item.slug === params.slug);

	if (!post) error(404, 'Blog post not found');

	return { post };
};
