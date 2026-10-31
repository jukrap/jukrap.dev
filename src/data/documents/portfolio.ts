// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/documents-portfolio.json';

import type { PortfolioPageDefinition } from '@/types/documents';

import type { Locale } from '@/types/locale';

export function getPortfolioDocument(
	locale: Locale,
): readonly PortfolioPageDefinition[] {
	return readCareerCall<readonly PortfolioPageDefinition[]>(
		snapshot,
		'getPortfolioDocument',
		locale,
	);
}

export const portfolioDocument: readonly PortfolioPageDefinition[] =
	readCareerValue<readonly PortfolioPageDefinition[]>(
		snapshot,
		'portfolioDocument',
	);
