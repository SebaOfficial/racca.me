import { GITHUB_TOKEN, GITHUB_PROJECTS_SOURCES, PROJECTS_CACHE } from '$env/static/private';
import type { GitHubRepository } from '$lib/types/GitHubRepository';
import axios, { type AxiosResponse } from 'axios';
import redis from '$lib/redis';

const fetchRepos = async (url: URL) => {
	const sources = GITHUB_PROJECTS_SOURCES.split(' ');

	const client = axios.create({
		baseURL: 'https://api.github.com',
		headers: {
			Authorization: `Bearer ${GITHUB_TOKEN}`,
			'User-Agent': url.hostname
		}
	});

	const responses: AxiosResponse<GitHubRepository>[] = await Promise.all(
		sources.map(async (source) => {
			const response = await client.get(`/${source}/repos?type=public`);
			return response;
		})
	);

	let repos: GitHubRepository[] = responses.map((response) => response.data);

	return repos
		.flat()
		.filter((repo) => repo.stargazers_count > 0)
		.sort((a, b) => b.stargazers_count - a.stargazers_count);
};

const getCachedRepos = async (url: URL): Promise<GitHubRepository[]> => {
	const key = 'repos';

	if (await redis.exists(key)) {
		return JSON.parse((await redis.get(key)) ?? '[]') as GitHubRepository[];
	}

	let repos = await fetchRepos(url);

	redis.set(key, JSON.stringify(repos), {
		EX: +PROJECTS_CACHE
	});

	return repos;
};

export const load = async ({ url }) => {
	return {
		repos: await getCachedRepos(url)
	};
};
