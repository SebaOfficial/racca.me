import { compile } from 'mdsvex';
import fs from 'node:fs/promises';
import path from 'node:path';
import { ensureScreenshot } from './project-screenshots.ts';

process.loadEnvFile();

const projectsDir = path.join('src', 'lib', 'blog', 'projects');

const readProjectLink = async (project: string) => {
	const md = await fs.readFile(path.join(projectsDir, project), { encoding: 'utf-8' });
	const res = await compile(md);
	if (!res) throw new Error("Couldn't compile markdown");

	const data = res.data as Record<string, Record<string, unknown>>;

	return data.fm.link as string;
};

const screenshotApi = process.env.SCREENSHOT_API;
if (!screenshotApi) throw new Error('Missing SCREENSHOT_API');

await Promise.all(
	(await fs.readdir(projectsDir)).map(async (project) => {
		const url = await readProjectLink(project);
		await ensureScreenshot(url, screenshotApi);
	}),
);
