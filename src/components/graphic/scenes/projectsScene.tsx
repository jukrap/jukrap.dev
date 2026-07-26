'use client';

import dynamic from 'next/dynamic';
import { projectSceneMedia, sceneContracts } from '@/data/graphicPortfolio';
import type { Locale } from '@/types/locale';
import type { ProjectRecord } from '@/types/portfolioExperiment';
import { SceneBoundary } from './sceneBoundary';

const ProjectsCanvas = dynamic(() => import('./projectsCanvas'), {
	ssr: false,
	loading: () => null,
});

export function ProjectsScene({
	record,
	rotationStep,
	locale,
}: {
	record: ProjectRecord;
	rotationStep: number;
	locale: Locale;
}) {
	const mediaSources = projectSceneMedia[record.slug];
	return (
		<SceneBoundary
			contract={sceneContracts.projects}
			locale={locale}
			contentKey={record.slug}
			fallbackOverlay={
				<div
					className="graphic-fallback-artifact"
					data-fallback-selection={record.slug}
				>
					{mediaSources ? (
						<picture>
							<source media="(max-width: 600px)" srcSet={mediaSources.mobile} />
							<img
								src={mediaSources.desktop}
								alt=""
								aria-hidden="true"
								width={1600}
								height={1000}
							/>
						</picture>
					) : null}
					<strong>{record.title[locale]}</strong>
				</div>
			}
		>
			{(props) => (
				<ProjectsCanvas
					{...props}
					mediaSources={mediaSources}
					rotationStep={rotationStep}
				/>
			)}
		</SceneBoundary>
	);
}
