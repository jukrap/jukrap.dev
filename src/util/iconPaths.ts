import { IconType } from '@/types/icon';
import { iconTypes } from '@/data/constants/iconTypes';

export { iconTypes };
export type { IconType };

export const getIconPath = (type: IconType, isDarkMode: boolean): string => {
	const mode = isDarkMode ? 'blackMode' : 'whiteMode';
	return `/icons/${mode}_${type}.svg`;
};
