import { redirect } from '@sveltejs/kit';
import { match } from '../params/lang';

export const load = ({ request, url }) => {
	const paths = url.pathname.split('/').filter(Boolean);

	if (!match(paths[0])) {
		let lang = 'en';
		const acceptLanguage = request.headers.get('accept-language');
		if (acceptLanguage) {
			const languageCode = acceptLanguage.split(',')[0];

			if (/^[a-zA-Z]{2,}$/.test(languageCode) && match(languageCode)) {
				lang = languageCode;
			}
		}

		if (!paths.includes(lang)) {
			throw redirect(301, `/${lang}${url.pathname}${url.search}`);
		}
	}
};
