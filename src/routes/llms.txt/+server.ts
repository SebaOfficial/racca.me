import { getPosts, getProjects } from '#lib/server/blog.ts';
import s from '#lib/strings.ts';
import { BASE_URL } from '$app/env/public';

export const prerender = true;

const formatLink = (label: string, url: string, description: string, tab: boolean = false) =>
	`${tab ? '\t' : ''}- [${label}](${url}): ${description.replace(/\s+/g, ' ').trim()}`;

export const GET = async () => {
	const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
	const blogLinks = posts
		.map((post) => formatLink(post.title, `${BASE_URL}/blog/${post.slug}`, post.description))
		.join('\n');

	const projectLinks = projects
		.map((project) => {
			const links = [
				formatLink(project.title, project.link, project.description),
				project.repository
					? formatLink(
							s.llms.projects.sourceCode.label,
							project.repository,
							s.llms.projects.sourceCode.description,
							true,
						)
					: null,
				formatLink(
					s.llms.projects.article.label,
					`${BASE_URL}/projects/${project.slug}`,
					s.llms.projects.article.description,
					true,
				),
			];
			return links.filter(Boolean).join('\n');
		})
		.join('\n');

	return new Response(
		`
# ${s.llms.title}

> ${s.llms.presentation}

${s.llms.description}

## ${s.llms.main.title}

${formatLink('Home', BASE_URL, s.llms.main.description)}

## ${s.llms.blog}

${blogLinks}

## ${s.llms.projects.title}

${projectLinks}

`.trim(),
	);
};
