import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { dictionaries } from '@/data/i18n/dictionaries';
import { isLocale } from '@/lib/locale';

interface LocalePageProps {
	params: Promise<{
		locale: string;
	}>;
}

export async function generateMetadata({
	params,
}: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	return isLocale(locale) ? dictionaries[locale].metadata.about : {};
}

export default async function About({ params }: LocalePageProps) {
	const { locale } = await params;
	redirect(`/${isLocale(locale) ? locale : 'ko'}/profile`);
}
