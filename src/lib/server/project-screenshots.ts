import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import screenshot from './screenshot.ts';

const generatedDir = path.join('src', 'lib', 'blog', 'generated');

export const screenshotFilename = (url: string) =>
	`${createHash('sha256').update(url).digest('hex')}.png`;

export const ensureScreenshot = async (url: string, screenshotApi: string) => {
	const filename = screenshotFilename(url);
	const filePath = path.join(generatedDir, filename);

	try {
		await fs.access(filePath);
		return filename;
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
	}

	await fs.mkdir(generatedDir, { recursive: true });
	await fs.writeFile(filePath, Buffer.from(await screenshot(url, screenshotApi), 'base64'));

	return filename;
};
