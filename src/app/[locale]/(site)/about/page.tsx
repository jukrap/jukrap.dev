import { redirect } from 'next/navigation';
import { isLocale } from '@/lib/locale';

export default async function AboutRedirect({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	redirect(`/${isLocale(locale) ? locale : 'ko'}/profile`);
}
