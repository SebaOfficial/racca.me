import multipart from 'parse-multipart-data';

interface MultipartPart {
	headers: Record<string, string>;
	data: Buffer;
	filename?: string;
}

const screenshot = async (url: string, screenshotApi: string) => {
	const res = await fetch(`${screenshotApi}/scrape`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'image/png',
		},
		body: JSON.stringify({
			url,
			browser_dim: [1920, 1080],
			max_screenshots: 1,
			wait: 1000,
		}),
	});

	if (!res.ok) {
		throw new Error(`Screenshot API error (${res.status}): ${await res.text()}`);
	}

	const contentType = res.headers.get('content-type') ?? '';
	const boundary = /boundary="?([^";]+)"?/i.exec(contentType)?.[1];

	if (!boundary) {
		throw new Error(`Missing multipart boundary: ${contentType}`);
	}

	const body = Buffer.from(await res.arrayBuffer());
	const parts = multipart.parse(body, boundary) as unknown as MultipartPart[];

	if (parts.length < 2) {
		throw new Error('Expected request metadata and website data');
	}

	const screenshots = parts.slice(2).map((part) => part.data.toString('base64'));

	return screenshots[0];
};

export default screenshot;
