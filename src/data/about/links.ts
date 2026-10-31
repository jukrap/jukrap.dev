// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/about-links.json';

import { Link } from '@/types/common';

export const links: Link[] = readCareerValue<Link[]>(snapshot, 'links');
