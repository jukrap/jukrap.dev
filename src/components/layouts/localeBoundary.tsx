'use client';

import { LocaleProvider } from '@/contexts/localeContext';
import { Locale } from '@/types/locale';

interface LocaleBoundaryProps {
	children: React.ReactNode;
	locale: Locale;
}

export const LocaleBoundary = ({ children, locale }: LocaleBoundaryProps) => (
	<LocaleProvider locale={locale}>{children}</LocaleProvider>
);
