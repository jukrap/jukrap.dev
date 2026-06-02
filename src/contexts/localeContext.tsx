'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import { dictionaries } from '@/data/i18n/dictionaries';
import { portfolioData } from '@/data/i18n/portfolio';
import { defaultLocale } from '@/lib/locale';
import { Locale, LocaleDictionary, PortfolioData } from '@/types/locale';

interface LocaleContextValue {
	locale: Locale;
	dictionary: LocaleDictionary;
	data: PortfolioData;
}

const LocaleContext = createContext<LocaleContextValue>({
	locale: defaultLocale,
	dictionary: dictionaries[defaultLocale],
	data: portfolioData[defaultLocale],
});

export const LocaleProvider = ({
	children,
	locale,
}: {
	children: React.ReactNode;
	locale: Locale;
}) => {
	const value = useMemo(
		() => ({
			locale,
			dictionary: dictionaries[locale],
			data: portfolioData[locale],
		}),
		[locale],
	);

	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	return (
		<LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
	);
};

export const useLocale = () => useContext(LocaleContext);
