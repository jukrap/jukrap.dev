import { create } from 'zustand';
import { ThemeState } from '@/types/theme';

const THEME_STORAGE_KEY = 'jukrap-theme';

const applyThemeClass = (isDarkMode: boolean) => {
	if (typeof document === 'undefined') return;
	document.documentElement.classList.toggle('dark', isDarkMode);
};

const getPreferredDarkMode = () => {
	if (typeof window === 'undefined') return false;

	const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
	if (savedTheme === 'dark') return true;
	if (savedTheme === 'light') return false;

	return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const useThemeStore = create<ThemeState>((set) => ({
	isDarkMode: false,
	isHydrated: false,
	initializeTheme: () => {
		const isDarkMode = getPreferredDarkMode();
		applyThemeClass(isDarkMode);
		set({ isDarkMode, isHydrated: true });
	},
	setMode: (isDarkMode) => {
		applyThemeClass(isDarkMode);
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(
				THEME_STORAGE_KEY,
				isDarkMode ? 'dark' : 'light',
			);
		}
		set({ isDarkMode, isHydrated: true });
	},
	toggleMode: () => {
		set((state) => {
			const isDarkMode = !state.isDarkMode;
			applyThemeClass(isDarkMode);
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(
					THEME_STORAGE_KEY,
					isDarkMode ? 'dark' : 'light',
				);
			}
			return { isDarkMode, isHydrated: true };
		});
	},
}));
