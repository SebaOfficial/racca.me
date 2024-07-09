export type AvailableLanguages = 'it' | 'en';

export interface SiteConfig {
	en: Config;
	it: Config;
}

export interface Config {
	navBar: NavBarElement[];
	pages: { [key: string]: Page };
}

export interface NavBarElement {
	title: string;
	href: string;
	content: string;
}

export interface Page {
	title: string;
	contents: any;
	seo: PageSEO;
}

export interface PageSEO {
	title: string;
	description: string;
}
