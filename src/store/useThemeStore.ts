import { create } from 'zustand';

type ThemeState = {
	isDarkMode: boolean;
	toggleMode: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
	isDarkMode: false,
	toggleMode: () => {
		set((state) => ({ isDarkMode: !state.isDarkMode }));
		document.documentElement.classList.toggle('dark');
	},
}));
