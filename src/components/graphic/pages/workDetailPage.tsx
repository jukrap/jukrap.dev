import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { caseStudyRecords } from '@/data/graphicPortfolio';
import { getLocalizedPath } from '@/lib/locale';
import type { Locale } from '@/types/locale';
import type { CaseStudyRecord } from '@/types/portfolioExperiment';

export function WorkDetailPage({
	record,
	locale,
}: {
	record: CaseStudyRecord;
	locale: Locale;
}) {
	const isKo = locale === 'ko';
	const currentIndex = caseStudyRecords.findIndex(
		(candidate) => candidate.slug === record.slug,
	);
	const previous =
		caseStudyRecords[
			(currentIndex - 1 + caseStudyRecords.length) % caseStudyRecords.length
		];
	const next = caseStudyRecords[(currentIndex + 1) % caseStudyRecords.length];

	return (
		<article className="graphic-detail-page">
			<Link
				className="graphic-back-link"
				href={getLocalizedPath('/work', locale)}
				prefetch={false}
			>
				<ArrowLeft aria-hidden />
				WORK
			</Link>
			<header className="graphic-detail-header">
				<h1>{record.title[locale]}</h1>
				<p>{record.summary[locale]}</p>
				<dl>
					<div>
						<dt>{isKo ? '역할' : 'Role'}</dt>
						<dd>{record.role[locale]}</dd>
					</div>
					<div>
						<dt>{isKo ? '기간' : 'Period'}</dt>
						<dd>{record.period}</dd>
					</div>
					<div>
						<dt>{isKo ? '기술' : 'Stack'}</dt>
						<dd>{record.stack.join(' / ')}</dd>
					</div>
				</dl>
			</header>
			<section className="graphic-detail-section">
				<h2>{isKo ? '문제와 시스템 경계' : 'Context and system boundary'}</h2>
				<p>{record.context[locale]}</p>
			</section>
			<section className="graphic-detail-section">
				<h2>{isKo ? '결정과 트레이드오프' : 'Decisions and tradeoffs'}</h2>
				<div className="graphic-decision-list">
					{record.decisions.map((decision, index) => (
						<article key={`${decision.title[locale]}-${index}`}>
							<span className="graphic-index">
								{String(index + 1).padStart(2, '0')}
							</span>
							<div>
								<h3>{decision.title[locale]}</h3>
								<p>{decision.body[locale]}</p>
							</div>
						</article>
					))}
				</div>
			</section>
			<section className="graphic-detail-section">
				<h2>{isKo ? '확인한 결과와 근거' : 'Verified results and evidence'}</h2>
				<dl className="graphic-evidence-list">
					{record.verifiedResults.map((result, index) => (
						<div key={`${result.evidence}-${index}`}>
							<dt>{result.statement[locale]}</dt>
							<dd>{result.evidence}</dd>
						</div>
					))}
				</dl>
			</section>
			<nav
				className="graphic-detail-pagination"
				aria-label={isKo ? '사례 이동' : 'Case navigation'}
			>
				<Link href={getLocalizedPath(`/work/${previous.slug}`, locale)}>
					<ArrowLeft aria-hidden />
					<span>
						<small>{isKo ? '이전 사례' : 'Previous case'}</small>
						{previous.title[locale]}
					</span>
				</Link>
				<Link href={getLocalizedPath(`/work/${next.slug}`, locale)}>
					<span>
						<small>{isKo ? '다음 사례' : 'Next case'}</small>
						{next.title[locale]}
					</span>
					<ArrowRight aria-hidden />
				</Link>
			</nav>
		</article>
	);
}
