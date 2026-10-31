// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/about-awards.json';

import { Award } from '@/types/profile';

export const awards: Award[] = readCareerValue<Award[]>(snapshot, 'awards');
