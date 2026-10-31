// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/decisionCases.json';

import type { DecisionCase } from '@/types/decisions';

import type { Locale } from '@/types/locale';

export const decisionCases: Record<
	Locale,
	Record<string, DecisionCase>
> = readCareerValue<Record<Locale, Record<string, DecisionCase>>>(
	snapshot,
	'decisionCases',
);
