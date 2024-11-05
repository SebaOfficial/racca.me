import { redirect } from '@sveltejs/kit';
import { match as matchLanguage, AVAILABLE_LANGUAGES } from './params/lang';

const DEFAULT_LANGUAGE = AVAILABLE_LANGUAGES[0];
const NO_LANG_ROUTES = ['/robots.txt', AVAILABLE_LANGUAGES.map((lang) => `/sitemap-${lang}.xml`)];

const isNoLangRoute = (pathname: string) => NO_LANG_ROUTES.includes(pathname);

const getPreferredLanguage = (acceptLanguageHeader: string | null) => {
	if (!acceptLanguageHeader) return DEFAULT_LANGUAGE;
	const preferredLang = acceptLanguageHeader.split(',')[0];
	return /^[a-zA-Z]{2,}$/.test(preferredLang) && matchLanguage(preferredLang)
		? preferredLang
		: DEFAULT_LANGUAGE;
};

const getRedirectUrl = (lang: string, pathname: string, search: string) =>
	`/${lang}${pathname === '/' ? '' : pathname}${search}`;

export const handle = async ({ event, resolve }) => {
	const { pathname, search } = event.url;
	const paths = pathname.split('/').filter(Boolean);

	if (isNoLangRoute(pathname)) {
		return await resolve(event);
	}

	// Redirect to preferred language if no language prefix is specified
	const specifiedLanguage = paths[0];
	if (!matchLanguage(specifiedLanguage)) {
		const preferredLanguage = getPreferredLanguage(event.request.headers.get('accept-language'));

		// Redirect only if the preferred language is not in the current URL path
		if (paths[0] !== preferredLanguage) {
			throw redirect(301, getRedirectUrl(preferredLanguage, pathname, search));
		}
	}

	return await resolve(event);
};
