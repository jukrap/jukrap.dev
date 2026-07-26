import type { Metadata } from 'next';
import { ProfilePage } from '@/components/graphic/pages/profilePage';
import { isLocale } from '@/lib/locale';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	return isLocale(locale)
		? {
				title: `Profile | Ju-cheol Park`,
				description:
					locale === 'ko'
						? '웹·모바일 프론트엔드 엔지니어 박주철의 기술, 경력, 연락처'
						: 'Skills, career, and contact details for Web & Mobile Frontend Engineer Ju-cheol Park',
			}
		: {};
}

export default function Page() {
	return <ProfilePage />;
}
