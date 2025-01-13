import { IconType } from '@/util/iconPaths';

export interface BaseLink {
	type: IconType;
	url: string;
}

export interface Link extends BaseLink {
	text: string;
	isExternal?: boolean;
}

export interface ProjectLink extends BaseLink {
	visible: boolean;
}

export interface IconLink extends Link {
	icon: string;
}
