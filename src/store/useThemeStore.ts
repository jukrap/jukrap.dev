import { create } from 'zustand';
import { ThemeState } from '@/types/theme';

export const useThemeStore = create<ThemeState>((set) => ({
	isDarkMode: false,
	toggleMode: () => {
		set((state) => ({ isDarkMode: !state.isDarkMode }));
		document.documentElement.classList.toggle('dark');
	},
}));
