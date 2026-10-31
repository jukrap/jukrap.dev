// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/about-personalInfo.json';

import { PersonalInfo } from '@/types/profile';

export const personalInfo: PersonalInfo = readCareerValue<PersonalInfo>(
	snapshot,
	'personalInfo',
);
