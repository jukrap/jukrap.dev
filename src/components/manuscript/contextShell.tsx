'use client';

import { useLocale } from '@/contexts/localeContext';
import { ManuscriptShell } from './shell';

export function ContextManuscriptShell({
	children,
}: {
	children: React.ReactNode;
}) {
	const { locale } = useLocale();
	return <ManuscriptShell locale={locale}>{children}</ManuscriptShell>;
}
