'use client';

import dynamic from 'next/dynamic';
import { sceneContracts } from '@/data/graphicPortfolio';
import type { Locale } from '@/types/locale';
import { SceneBoundary } from './sceneBoundary';

const OverviewCanvas = dynamic(() => import('./overviewCanvas'), {
	ssr: false,
	loading: () => null,
});

export function OverviewScene({ locale }: { locale: Locale }) {
	return (
		<SceneBoundary contract={sceneContracts.overview} locale={locale}>
			{(props) => <OverviewCanvas {...props} />}
		</SceneBoundary>
	);
}
