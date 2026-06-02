import { notFound } from 'next/navigation';
import LayoutWrapper from '@/components/layouts/layoutWrapper';
import { isLocale, locales } from '@/lib/locale';
import { Locale } from '@/types/locale';

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: Promise<{
		locale: string;
	}>;
}

export const dynamicParams = false;

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: LocaleLayoutProps) {
	const { locale: localeParam } = await params;

	if (!isLocale(localeParam)) {
		notFound();
	}

	const locale: Locale = localeParam;

	return <LayoutWrapper locale={locale}>{children}</LayoutWrapper>;
}
