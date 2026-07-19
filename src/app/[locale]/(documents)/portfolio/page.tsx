import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { PortfolioDocument } from '@/components/documents/portfolio';

interface PortfolioPageProps {
	params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
	title: '포트폴리오 | 박주철',
	description:
		'웹과 모바일 앱에서 사용자 흐름과 시스템 경계를 나눈 판단, 구현, 검증 과정을 정리한 박주철의 포트폴리오',
	alternates: {
		canonical: 'https://jukrap.vercel.app/ko/portfolio',
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default async function PortfolioPage({ params }: PortfolioPageProps) {
	const { locale } = await params;

	if (locale === 'en') {
		redirect('/ko/portfolio');
	}

	if (locale !== 'ko') {
		notFound();
	}

	return <PortfolioDocument />;
}
