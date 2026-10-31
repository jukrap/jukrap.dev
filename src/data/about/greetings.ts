// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/about-greetings.json';

export const greetings: string[] = readCareerValue<string[]>(
	snapshot,
	'greetings',
);
