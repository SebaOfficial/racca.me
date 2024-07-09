import { argv } from 'process';
import { parseString } from 'xml2js';
import { getPreviewPath } from '../src/lib/helpers';
import puppeteer from 'puppeteer';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

const captureScreenshot = async (url: string, outputPath: string) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle2' });
	await page.setViewport({ width: 1920, height: 1080 });
	await page.screenshot({ path: outputPath });
	await browser.close();
};

const getSitemapUrls = (robotsTxtContent: string) => {
	const urls: string[] = [];

	robotsTxtContent.split('\n').forEach((line) => {
		if (line.trim().startsWith('Sitemap:')) {
			const url = line.trim().split(': ')[1];
			if (url) {
				urls.push(url);
			}
		}
	});

	return urls;
};

const main = async (baseURL: string) => {
	const axiosClient = axios.create();

	getSitemapUrls((await axiosClient.get(`${baseURL}/robots.txt`)).data).forEach(async (sitemap) => {
		let urls: string[] = [];

		parseString((await axiosClient.get(sitemap)).data, (err, res) => {
			urls = res.urlset.url.map((urlObj: any) => {
				return urlObj.loc[0];
			});
		});

		urls.forEach(async (url) => {
			const previewPath = getPreviewPath(new URL(url));

			fs.mkdirSync(previewPath.dir, { recursive: true });

			captureScreenshot(url, path.join(previewPath.dir, previewPath.base)).then(() => {
				console.log(`Generated preview for ${url}`);
			});
		});
	});
};

if (argv.length < 3) {
	console.error(`Usage: ${argv[1]} <BASE URL> <OUT DIR>`);
	process.exit(1);
}

main(argv[2]);
