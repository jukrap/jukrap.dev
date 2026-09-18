'use client';

import { usePathname } from 'next/navigation';
import type { RecruitingDocumentId } from '@/types/documents';
import type { Locale } from '@/types/locale';

const documentIds: readonly RecruitingDocumentId[] = [
	'portfolio',
	'resume',
	'career-brief',
];

export const DocumentDownloadLink = ({ locale }: { locale: Locale }) => {
	const pathname = usePathname();
	const documentId = documentIds.find((id) => pathname === `/${locale}/${id}`);

	if (!documentId) return null;

	const filename = `${documentId}-${locale}.pdf`;

	return (
		<a
			href={`/documents/${filename}`}
			download={filename}
			className="document-toolbar-button"
		>
			{locale === 'ko' ? 'PDF 다운로드' : 'Download PDF'}
		</a>
	);
};
