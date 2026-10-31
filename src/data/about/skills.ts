// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/about-skills.json';

import { Skill } from '@/types/profile';

export const skills: Skill[] = readCareerValue<Skill[]>(snapshot, 'skills');
