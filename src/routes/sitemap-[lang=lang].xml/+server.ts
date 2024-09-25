import { getCurrentDate } from '$lib/helpers.js';
import redis from '$lib/redis';

export const GET = async ({ params, url }) => {
	const host = `${url.protocol}//${url.host}`;

	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
      <url>
        <loc>${host}/${params.lang}</loc>
        <lastmod>2023-09-18</lastmod>
        <priority>1</priority>
      </url>
      <url>
        <loc>${host}/${params.lang}/contacts</loc>
        <lastmod>2023-09-18</lastmod>
        <priority>0.6</priority>
      </url>
      <url>
        <loc>${host}/${params.lang}/donate</loc>
        <lastmod>2024-08-23</lastmod>
        <priority>0.6</priority>
      </url>
      <url>
        <loc>${host}/${params.lang}/pay</loc>
        <lastmod>2024-08-23</lastmod>
        <priority>0.2</priority>
      </url>
      <url>
        <loc>${host}/${params.lang}/projects</loc>
        <lastmod>${(await redis.get('repos-last-changed')) || getCurrentDate()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
      </url>
		</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
};
