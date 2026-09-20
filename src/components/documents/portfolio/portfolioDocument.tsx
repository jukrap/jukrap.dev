import type { Locale } from '@/types/locale';
import { getPortfolioDocument } from '@/data/documents';
import type { PortfolioPageDefinition } from '@/types/documents';

import { PortfolioPage } from './portfolioPage';

interface PortfolioDocumentProps {
	pages?: readonly PortfolioPageDefinition[];
	locale?: Locale;
}

export function PortfolioDocument({
	locale = 'ko',
	pages = getPortfolioDocument(locale),
}: PortfolioDocumentProps) {
	return (
		<article
			lang={locale}
			aria-label={
				locale === 'ko' ? '박주철 포트폴리오' : 'Ju-cheol Park portfolio'
			}
			className="document-pages document-page-stack mx-auto w-full bg-muted/30 print:bg-white"
		>
			{pages.map((page) => (
				<PortfolioPage key={page.id} page={page} locale={locale} />
			))}
		</article>
	);
}

export default PortfolioDocument;
