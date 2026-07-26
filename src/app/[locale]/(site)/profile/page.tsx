import type { Metadata } from 'next';
import { ProfilePage } from '@/components/manuscript/pages';
import { isLocale } from '@/lib/locale';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { locale } = await params;
	return {
		title: locale === 'ko' ? 'PROFILE | 박주철' : 'PROFILE | Ju-cheol Park',
		description:
			locale === 'ko'
				? 'Web & Mobile Frontend Engineer 박주철의 소개와 기술, 경력'
				: 'Profile, skills, and experience of Ju-cheol Park, Web & Mobile Frontend Engineer',
	};
}

export default async function Profile({ params }: PageProps) {
	const { locale } = await params;
	if (!isLocale(locale)) return null;
	return <ProfilePage locale={locale} />;
}
