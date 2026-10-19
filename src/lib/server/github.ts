import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN, GITHUB_PROJECTS_SOURCES, GITHUB_PROJECTS_MIN_STARS } from '$app/env/private';
import type { GitHubRepository } from '#lib/github.d.ts';

const octokit = new Octokit({
	auth: GITHUB_TOKEN,
});

export const projects: GitHubRepository[] = [
	...new Map(
		(
			await Promise.all(
				GITHUB_PROJECTS_SOURCES.map((source) => {
					if (source.type === 'user') {
						return octokit.paginate(octokit.rest.repos.listForUser, {
							username: source.name,
							type: 'owner',
							per_page: 100,
						});
					}

					return octokit.paginate(octokit.rest.repos.listForOrg, {
						org: source.name,
						type: 'public',
						per_page: 100,
					});
				}),
			)
		)
			.flat()
			.map((repo) => [repo.html_url, repo] as const),
	).values(),
]
	.filter((repo) => !repo.archived && (repo.stargazers_count || 0) >= GITHUB_PROJECTS_MIN_STARS)
	.sort((a, b) => b.stargazers_count! - a.stargazers_count!)
	.map((repo) => ({
		name: repo.name,
		fullName: repo.full_name,
		description: repo.description!,
		stars: repo.stargazers_count || 0,
		forks: repo.forks_count || 0,
		url: repo.html_url,
	}));
