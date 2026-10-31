// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/documents-portfolioFeatureCases.json';

import type { PortfolioPageDefinition } from '@/types/documents';

import type { Locale } from '@/types/locale';

export function getPortfolioFeatureCases(
	locale: Locale,
): PortfolioPageDefinition[] {
	return readCareerCall<PortfolioPageDefinition[]>(
		snapshot,
		'getPortfolioFeatureCases',
		locale,
	);
}
