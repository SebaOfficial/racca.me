import type { AvailableLanguages } from '$lib/types/SiteConfig';
import siteConfig from '$lib/config/site';

export const load = async ({ url, params }) => {
	const conf = siteConfig[params.lang as AvailableLanguages];

	return {
		navBar: conf.navBar,
		page:
			conf.pages[
				url.pathname
					.replace(params.lang || '', '')
					.split('/')
					.filter(Boolean)
					.pop() || ''
			] ?? conf.pages.notFound
	};
};
