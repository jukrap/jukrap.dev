import { Locale, locales } from '@/types/locale';

export { locales } from '@/types/locale';

export const defaultLocale: Locale = 'ko';

export const isLocale = (value: string): value is Locale =>
	locales.includes(value as Locale);

export const stripLocaleFromPath = (pathname: string) => {
	const parts = pathname.split('/').filter(Boolean);
	if (parts.length > 0 && isLocale(parts[0])) {
		return `/${parts.slice(1).join('/')}` || '/';
	}
	return pathname || '/';
};

export const getLocalizedPath = (href: string, locale: Locale) => {
	const normalizedHref = href.startsWith('/') ? href : `/${href}`;
	const pathWithoutLocale = stripLocaleFromPath(normalizedHref);
	return pathWithoutLocale === '/'
		? `/${locale}`
		: `/${locale}${pathWithoutLocale}`;
};

export const getAlternateLocalePath = (pathname: string, nextLocale: Locale) =>
	getLocalizedPath(stripLocaleFromPath(pathname), nextLocale);
