import { getPosts, getProjects } from '#lib/server/blog.ts';
import { BASE_URL } from '$app/env/public';

export const prerender = true;

export const GET = async () => {
	const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
	const urls: { slug: string; updated?: Date }[] = [
		{ slug: '/' },
		...posts.map((p) => {
			return { slug: `/blog/${p.slug}`, updated: p.updated };
		}),
		...projects
			.filter((p) => Boolean(p.content))
			.map((p) => {
				return { slug: `/projects/${p.slug}`, updated: p.updated };
			}),
	];

	const escapeXml = (value: string) =>
		value.replace(
			/[<>&'"]/g,
			(character) =>
				({
					'<': '&lt;',
					'>': '&gt;',
					'&': '&amp;',
					"'": '&apos;',
					'"': '&quot;',
				})[character]!,
		);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map((url) => {
		const lastmod = url.updated ? url.updated.toISOString().slice(0, 10) : undefined;

		return `\t<url><loc>${escapeXml(`${BASE_URL}${url.slug}`)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
	})
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};
