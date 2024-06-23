import { IconType } from "@/util/iconPaths";

export interface Link {
	text: string;
	type: IconType;
	url: string;
	isExternal?: boolean;
}