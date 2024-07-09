import { GITHUB_TOKEN, GITHUB_PROJECTS_SOURCES } from '$env/static/private';
import type { GitHubRepository } from '$lib/types/GitHubRepository';
import axios, { type AxiosResponse } from 'axios';

const sources = GITHUB_PROJECTS_SOURCES.split(' ');

const client = axios.create({
	baseURL: 'https://api.github.com',
	headers: {
		Authorization: `Bearer ${GITHUB_TOKEN}`,
		'User-Agent': 'racca.me'
	}
});

const fetchRepos = async () => {
	const responses: AxiosResponse<GitHubRepository>[] = await Promise.all(
		sources.map(async (source) => {
			const response = await client.get(`/${source}/repos?type=public`);
			return response;
		})
	);

	let repos: GitHubRepository[] = responses.map((response) => response.data);

	return repos.flat().sort((a, b) => b.stargazers_count - a.stargazers_count);
};

export const load = async () => {
	return {
		repos: await fetchRepos()
	};
};
