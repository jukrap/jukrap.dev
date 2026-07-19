import { portfolioDocument } from '@/data/documents';
import type { PortfolioPageDefinition } from '@/types/documents';

import { PortfolioPage } from './portfolioPage';

interface PortfolioDocumentProps {
	pages?: readonly PortfolioPageDefinition[];
}

export function PortfolioDocument({
	pages = portfolioDocument,
}: PortfolioDocumentProps) {
	return (
		<article
			aria-label="박주철 웹·모바일 프론트엔드 포트폴리오"
			className="document-pages document-page-stack mx-auto w-full bg-muted/30 print:bg-white"
		>
			{pages.map((page) => (
				<PortfolioPage key={page.id} page={page} />
			))}
		</article>
	);
}

export default PortfolioDocument;
