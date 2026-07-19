import { notFound } from 'next/navigation';
import { LocaleBoundary } from '@/components/layouts/localeBoundary';
import { isLocale, locales } from '@/lib/locale';

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

	return <LocaleBoundary locale={localeParam}>{children}</LocaleBoundary>;
}
