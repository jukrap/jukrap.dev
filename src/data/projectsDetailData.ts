// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/projectsDetailData.json';

import { Project } from '@/types/project';

export const projectsDetailData: Project[] = readCareerValue<Project[]>(
	snapshot,
	'projectsDetailData',
);
