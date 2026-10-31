// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/projectsData.json';

import { SimpleProject } from '@/types/project';

export const projectsData: SimpleProject[] = readCareerValue<SimpleProject[]>(
	snapshot,
	'projectsData',
);
