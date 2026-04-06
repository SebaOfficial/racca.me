import { FileSystem } from "$lib/terminal";

export const match = (slug: string) => FileSystem.exists(`~/projects/${slug}.md`, 'file');
