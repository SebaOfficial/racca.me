import { FileSystem } from "$lib/terminal";

export const match = (slug: string) => FileSystem.exists(`~/blog/${slug}.md`, 'file');
