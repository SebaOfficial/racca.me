export const GET = ({ url }) => {
	return new Response(`User-agent: *
Allow: /it/
Allow: /en/
Sitemap: ${`${url.protocol}//${url.host}`}/sitemap-it.xml
Sitemap: ${`${url.protocol}//${url.host}`}/sitemap-en.xml
`);
};
