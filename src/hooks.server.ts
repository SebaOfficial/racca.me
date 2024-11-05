import { redirect } from '@sveltejs/kit';
import { match as matchLanguage, AVAILABLE_LANGUAGES } from './params/lang';

const DEFAULT_LANGUAGE = AVAILABLE_LANGUAGES[0];

export const handle = async ({ event, resolve }) => {
	const paths = event.url.pathname.split('/').filter(Boolean);

	// Redirect user if they haven't specified a language
	if (!matchLanguage(paths[0])) {
		let lang = DEFAULT_LANGUAGE;

		const acceptLanguage = event.request.headers.get('accept-language');
		if (acceptLanguage) {
			const languageCode = acceptLanguage.split(',')[0];

			if (/^[a-zA-Z]{2,}$/.test(languageCode) && matchLanguage(languageCode)) {
				lang = languageCode;
			}
		}

		if (!paths.includes(lang)) {
			throw redirect(
				301,
				`/${lang}${event.url.pathname == '/' ? '' : event.url.pathname}${event.url.search}`
			);
		}
	}

	return await resolve(event);
};
