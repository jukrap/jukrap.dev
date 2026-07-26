'use client';

import dynamic from 'next/dynamic';
import { sceneContracts, workSceneParameters } from '@/data/graphicPortfolio';
import type { CaseStudyRecord } from '@/types/portfolioExperiment';
import type { Locale } from '@/types/locale';
import { SceneBoundary } from './sceneBoundary';

const WorkCanvas = dynamic(() => import('./workCanvas'), {
	ssr: false,
	loading: () => null,
});

export function WorkScene({
	record,
	index,
	locale,
}: {
	record: CaseStudyRecord;
	index: number;
	locale: Locale;
}) {
	const profile = workSceneParameters[record.slug];
	return (
		<SceneBoundary
			contract={sceneContracts.work}
			locale={locale}
			contentKey={record.slug}
			fallbackOverlay={
				<div
					className="graphic-fallback-selection"
					data-fallback-selection={record.slug}
				>
					<span>CASE {String(index + 1).padStart(2, '0')}</span>
					<strong>{record.title[locale]}</strong>
					<small>{profile.layers.join(' / ').toUpperCase()}</small>
				</div>
			}
		>
			{(props) => <WorkCanvas {...props} profile={profile} />}
		</SceneBoundary>
	);
}
