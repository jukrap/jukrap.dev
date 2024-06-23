export const iconTypes = [
	'appleStore',
	'googleStore',
	'github',
	'url',
	'detailView',
	'video',
	'ppt',
	'doc',
	'other',
	'email',
	'blog',
	'linkedin',
    'downArrow',
	'forward',
	'back',
	'close'
] as const;
//googlePlay => googlePlay
//appStore => appleStore

export type IconType = (typeof iconTypes)[number];

export const getIconPath = (type: IconType, isDarkMode: boolean): string => {
	const mode = isDarkMode ? 'blackMode' : 'whiteMode';
	return `/icons/${mode}_${type}.svg`;
};
