import svg from '#lib/assets/favicon.svg?raw';
import sharp from 'sharp';
import toIco from 'to-ico';

export const prerender = true;

export const GET = async () => {
	const png = await sharp(Buffer.from(svg)).resize(32, 32).png().toBuffer();

	const ico = await toIco([png]);

	return new Response(new Uint8Array(ico), {
		headers: {
			'Content-Type': 'image/x-icon',
			'Cache-Control': 'public, max-age=86400',
		},
	});
};
