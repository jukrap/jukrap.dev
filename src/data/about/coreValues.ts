// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/about-coreValues.json';

import { CoreValue } from '@/types/profile';

export const coreValues: CoreValue[] = readCareerValue<CoreValue[]>(
	snapshot,
	'coreValues',
);
