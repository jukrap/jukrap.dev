// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/workCases.json';

import type { Localized } from '@/types/locale';

import type { WorkCaseRecord } from '@/types/work';

export const workCases: Localized<WorkCaseRecord[]> = readCareerValue<
	Localized<WorkCaseRecord[]>
>(snapshot, 'workCases');
