import { BASE_URL } from '$app/env/public';

export const prerender = true;

export const GET = () => {
	return new Response(
		`
User-agent: *
Disallow:
Sitemap: ${BASE_URL}/sitemap.xml

# AI-readable site overview
# ${BASE_URL}llms.txt
	`.trim(),
	);
};
