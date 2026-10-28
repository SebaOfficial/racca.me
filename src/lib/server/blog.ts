import { compile } from 'mdsvex';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { Picture } from '@sveltejs/enhanced-img';
import type { BlogPost, BlogProject } from '#lib/blog.d.ts';
import { screenshotFilename } from '#lib/server/project-screenshots.ts';
import rehypeSlug from 'rehype-slug';
import rehypeExternalLinks from 'rehype-external-links';

const src = path.join('src', 'lib', 'blog');
const projectsDir = path.join(src, 'projects');
const postsDir = path.join(src, 'posts');
const generatedScreenshots = import.meta.glob<Picture>('../blog/generated/*.png', {
	eager: true,
	import: 'default',
	query: '?enhanced',
});

const saveScreenshot = async (url: string) => {
	const filename = screenshotFilename(url);
	const preview = generatedScreenshots[`../blog/generated/${filename}`];
	if (!preview) {
		throw new Error(
			`Missing generated screenshot import: ${filename}. Run the prebuild step first.`,
		);
	}

	return preview;
};

const parseMd = async (md: string) => {
	const res = await compile(md, {
		smartypants: true,
		highlight: {
			optimise: false,
		},
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeExternalLinks,
				{
					target: '_blank',
					rel: ['noopener', 'noreferrer'],
					protocols: ['http', 'https', 'mailto'],
				},
			],
		],
	});

	if (!res) throw new Error("Couldn't compile markdown");

	const data = res.data as Record<string, Record<string, unknown>>;
	const html = res.code.replace(/^<script context="module">[\s\S]*?<\/script>\s*/, '');

	return {
		html: data.fm.noContent ? undefined : html,
		fm: data.fm,
	};
};

const loadProjects = async (): Promise<BlogProject[]> =>
	(
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
					preview: await saveScreenshot(fm.link as string),
					content: html,
					created: fm.created ? new Date(fm.created as string) : undefined,
					updated: fm.updated ? new Date(fm.updated as string) : undefined,
				};
			}),
		)
	).sort((a, b) => (a.created || new Date()).getTime() - (b.created || new Date()).getTime());

const loadPosts = async (): Promise<BlogPost[]> =>
	(
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

let projectsPromise: Promise<BlogProject[]> | undefined;
let postsPromise: Promise<BlogPost[]> | undefined;

export const getProjects = () => (projectsPromise ??= loadProjects());
export const getPosts = () => (postsPromise ??= loadPosts());
