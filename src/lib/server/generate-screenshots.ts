import { compile } from 'mdsvex';
import fs from 'node:fs/promises';
import path from 'node:path';
import { ensureScreenshot } from './project-screenshots.ts';
import { closeBrowser } from './screenshot.ts';

const projectsDir = path.join('src', 'lib', 'blog', 'projects');

const readProjectLink = async (project: string) => {
	const md = await fs.readFile(path.join(projectsDir, project), { encoding: 'utf-8' });
	const res = await compile(md);
	if (!res) throw new Error("Couldn't compile markdown");

	const data = res.data as Record<string, Record<string, unknown>>;

	return data.fm.link as string;
};

try {
	await Promise.all(
		(await fs.readdir(projectsDir)).map(async (project) => {
			const url = await readProjectLink(project);
			await ensureScreenshot(url);
		}),
	);
} finally {
	await closeBrowser();
}
