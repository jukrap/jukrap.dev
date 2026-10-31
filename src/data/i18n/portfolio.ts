// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/i18n-portfolio.json';

import { Localized, PortfolioData } from '@/types/locale';

export const portfolioData: Localized<PortfolioData> = readCareerValue<
	Localized<PortfolioData>
>(snapshot, 'portfolioData');
