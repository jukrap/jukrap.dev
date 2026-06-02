import { Locale, locales } from '@/types/locale';

export { locales } from '@/types/locale';

export const defaultLocale: Locale = 'ko';

export const isLocale = (value: string): value is Locale =>
	locales.includes(value as Locale);

export const getPreferredLocale = (acceptLanguage?: string | null): Locale => {
	if (!acceptLanguage) return defaultLocale;

	const requestedLanguages = acceptLanguage
		.split(',')
		.map((language, index) => {
			const [rawTag, ...rawParams] = language.trim().split(';');
			const qualityParam = rawParams.find((param) =>
				param.trim().startsWith('q='),
			);
			const quality = qualityParam
				? Number.parseFloat(qualityParam.trim().slice(2))
				: 1;

			return {
				index,
				tag: rawTag.toLowerCase(),
				quality: Number.isNaN(quality) ? 0 : quality,
			};
		})
		.filter(({ tag, quality }) => tag.length > 0 && quality > 0)
		.sort(
			(left, right) => right.quality - left.quality || left.index - right.index,
		);

	for (const { tag } of requestedLanguages) {
		const baseLanguage = tag.split('-')[0];
		const matchedLocale = locales.find(
			(locale) => locale === tag || locale === baseLanguage,
		);

		if (matchedLocale) return matchedLocale;
	}

	return defaultLocale;
};

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
