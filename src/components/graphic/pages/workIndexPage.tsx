'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { WorkScene } from '@/components/graphic/scenes/workScene';
import { useLocale } from '@/contexts/localeContext';
import { caseStudyRecords } from '@/data/graphicPortfolio';
import { getLocalizedPath } from '@/lib/locale';

export function WorkIndexPage() {
	const { locale } = useLocale();
	const isKo = locale === 'ko';
	const [selectedIndex, setSelectedIndex] = useState(0);
	const selected = caseStudyRecords[selectedIndex];

	return (
		<section className="graphic-index-page graphic-work-page">
			<header className="graphic-page-heading">
				<h1>WORK</h1>
				<p>
					{isKo
						? '실제 업무 사례를 선택하면 문제 경계와 확인한 결과가 함께 바뀝니다.'
						: 'Select a case to inspect its boundary and verified outcomes.'}
				</p>
			</header>
			<div className="graphic-work-layout">
				<div
					className="graphic-selector"
					role="group"
					aria-label={isKo ? '업무 사례 선택' : 'Select a work case'}
				>
					{caseStudyRecords.map((record, index) => (
						<button
							key={record.slug}
							type="button"
							aria-pressed={index === selectedIndex}
							onClick={() => setSelectedIndex(index)}
						>
							<span className="graphic-index">
								{String(index + 1).padStart(2, '0')}
							</span>
							<strong>{record.title[locale]}</strong>
							<span>{record.period}</span>
						</button>
					))}
				</div>
				<div className="graphic-work-stage">
					<WorkScene record={selected} index={selectedIndex} locale={locale} />
					<div className="graphic-selected-summary" aria-live="polite">
						<header>
							<div>
								<p>{selected.role[locale]}</p>
								<h2>{selected.title[locale]}</h2>
							</div>
							<time>{selected.period}</time>
						</header>
						<dl>
							<div>
								<dt>{isKo ? '문제' : 'Boundary'}</dt>
								<dd>{selected.context[locale]}</dd>
							</div>
							<div>
								<dt>{isKo ? '핵심 판단' : 'Decision'}</dt>
								<dd>
									{selected.decisions[0]?.body[locale] ?? selected.summary[locale]}
								</dd>
							</div>
							<div>
								<dt>{isKo ? '확인한 결과' : 'Verified result'}</dt>
								<dd>
									{selected.verifiedResults[0]?.statement[locale] ??
										(isKo ? '검증 기록은 상세에서 확인' : 'See detail evidence')}
								</dd>
							</div>
						</dl>
						<Link
							className="graphic-detail-link"
							href={getLocalizedPath(`/work/${selected.slug}`, locale)}
						>
							{isKo ? '사례 자세히 보기' : 'Read case study'}
							<ArrowRight aria-hidden />
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
