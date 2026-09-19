import type { Metadata } from 'next';
import { PlayPage } from '@/components/pages/play/playPage';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	return {
		title: 'Play — Jukrap',
		description:
			locale === 'ko'
				? '작은 언덕 위, Doge와 잠깐 쉬어 가세요.'
				: 'A small hillside. A little time with Doge.',
		robots: { index: false, follow: false },
		alternates: {
			canonical: `/${locale}/play`,
			languages: { ko: '/ko/play', en: '/en/play' },
		},
	};
}
export default function Page() {
	return <PlayPage />;
}
