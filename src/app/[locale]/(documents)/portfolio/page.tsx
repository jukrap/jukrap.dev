import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { PortfolioDocument } from '@/components/documents/portfolio';
import { portfolioDocumentDefinition } from '@/data/documents/manifest';

interface PortfolioPageProps {
	params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
	title: `${portfolioDocumentDefinition.title} | 박주철`,
	description: portfolioDocumentDefinition.description,
	alternates: {
		canonical: `https://jukrap.vercel.app${portfolioDocumentDefinition.slug}`,
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default async function PortfolioPage({ params }: PortfolioPageProps) {
	const { locale } = await params;

	if (locale === 'en') {
		redirect(portfolioDocumentDefinition.slug);
	}

	if (locale !== 'ko') {
		notFound();
	}

	return <PortfolioDocument />;
}
