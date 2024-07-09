import path from 'path';

export const getPreviewPath = (url: URL): path.ParsedPath => {
	return path.parse(path.join('static', 'img', 'preview', `${path.normalize(url.pathname)}.png`));
};
