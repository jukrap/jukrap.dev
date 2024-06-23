import { useThemeStore } from '../store/useThemeStore';
import { getIconPath, IconType } from '@/util/iconPaths';

export const useIcon = () => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);

	const getIcon = (type: IconType) => getIconPath(type, isDarkMode);

	return { getIcon };
};
