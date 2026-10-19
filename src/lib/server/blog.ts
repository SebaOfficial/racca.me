import { compile } from 'mdsvex';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { BlogPost, BlogProject } from '#lib/blog.d.ts';
import screenshot from '#lib/server/screenshot.ts';
import rehypeSlug from 'rehype-slug';

const src = path.join('src', 'lib', 'blog');
const projectsDir = path.join(src, 'projects');
const postsDir = path.join(src, 'posts');

const parseMd = async (md: string) => {
	const res = await compile(md, {
		smartypants: true,
		rehypePlugins: [rehypeSlug],
	});

	if (!res) throw new Error("Coudn't compile markdown");

	const data = res.data as Record<string, Record<string, unknown>>;
	const html = res.code.replace(/^<script context="module">[\s\S]*?<\/script>\s*/, '');

	return {
		html: data.fm.noContent ? undefined : html,
		fm: data.fm,
	};
};

export const projects: BlogProject[] = (
	await Promise.all(
		(await fs.readdir(projectsDir)).map(async (project) => {
			const md = await fs.readFile(path.join(projectsDir, project), {
				encoding: 'utf-8',
			});

			const { html, fm } = await parseMd(md);

			return {
				type: 'project' as const,
				slug: path.parse(project).name,
				title: fm.title as string,
				description: fm.description as string,
				repository: fm.repository as string,
				link: fm.link as string,
				preview: `data:image/png;base64,${await screenshot(fm.link as string)}`,
				content: html,
				created: fm.created ? new Date(fm.created as string) : undefined,
				updated: fm.updated ? new Date(fm.updated as string) : undefined,
			};
		}),
	)
).sort((a, b) => (a.created || new Date()).getTime() - (b.created || new Date()).getTime());

export const posts: BlogPost[] = (
	await Promise.all(
		(await fs.readdir(postsDir)).map(async (post) => {
			const md = await fs.readFile(path.join(postsDir, post), { encoding: 'utf-8' });
			const { html, fm } = await parseMd(md);

			return {
				type: 'post' as const,
				slug: path.parse(post).name,
				content: html!,
				title: fm.title as string,
				description: fm.description as string,
				created: new Date(fm.created as string),
				updated: new Date(fm.updated as string),
			};
		}),
	)
).sort((a, b) => a.created.getTime() - b.created.getTime());
