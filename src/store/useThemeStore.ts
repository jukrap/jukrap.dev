import { create } from 'zustand';
import { ThemeState } from '@/types/theme';

const THEME_STORAGE_KEY = 'jukrap-theme';

const applyThemeClass = (isDarkMode: boolean) => {
	if (typeof document === 'undefined') return;
	document.documentElement.classList.toggle('dark', isDarkMode);
};

const getPreferredDarkMode = () => {
	if (typeof window === 'undefined') return false;

	let savedTheme: string | null = null;
	try {
		savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
	} catch {
		// Theme selection still works when browser storage is unavailable.
	}
	if (savedTheme === 'dark') return true;
	if (savedTheme === 'light') return false;

	return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const persistTheme = (isDarkMode: boolean) => {
	try {
		window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
	} catch {
		// Keep the current session usable without persistent storage.
	}
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
		if (typeof window !== 'undefined') persistTheme(isDarkMode);
		set({ isDarkMode, isHydrated: true });
	},
	toggleMode: () => {
		set((state) => {
			const isDarkMode = !state.isDarkMode;
			applyThemeClass(isDarkMode);
			if (typeof window !== 'undefined') persistTheme(isDarkMode);
			return { isDarkMode, isHydrated: true };
		});
	},
}));
