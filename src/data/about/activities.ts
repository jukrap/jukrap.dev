// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/about-activities.json';

import { Activity } from '@/types/profile';

export const activities: Activity[] = readCareerValue<Activity[]>(
	snapshot,
	'activities',
);
