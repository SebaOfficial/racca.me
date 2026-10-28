import { redirect } from '@sveltejs/kit';

export const trailingSlash = 'always';

export const load = () => {
	redirect(301, '/#blog');
};
