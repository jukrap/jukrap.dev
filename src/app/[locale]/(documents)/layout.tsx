import { notFound } from 'next/navigation';
import { DocumentShell } from '@/components/documents/documentShell';
import { isLocale } from '@/lib/locale';

interface DocumentsLayoutProps {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}

export default async function DocumentsLayout({
	children,
	params,
}: DocumentsLayoutProps) {
	const { locale } = await params;

	if (!isLocale(locale)) {
		notFound();
	}

	return <DocumentShell locale={locale}>{children}</DocumentShell>;
}
