import { chromium } from 'playwright';

const browser = await chromium.launch({
	args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});

const screenshot = async (url: string) => {
	const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
	try {
		await page.goto(url, { waitUntil: 'networkidle' });
		await page.waitForTimeout(2000);
		return (await page.screenshot()).toBase64();
	} finally {
		await page.close();
	}
};

export const closeBrowser = () => browser.close();

export default screenshot;
