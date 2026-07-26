import { create } from 'zustand';
import type { ThemePreference, ThemeState } from '@/types/theme';

export const THEME_STORAGE_KEY = 'jukrap.theme.manuscript';

const isThemePreference = (value: string | null): value is ThemePreference =>
	value === 'system' || value === 'light' || value === 'dark';

const resolveDarkMode = (preference: ThemePreference) =>
	preference === 'dark' ||
	(preference === 'system' &&
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-color-scheme: dark)').matches);

const applyTheme = (preference: ThemePreference) => {
	if (typeof document === 'undefined') return;
	const isDarkMode = resolveDarkMode(preference);
	document.documentElement.classList.toggle('dark', isDarkMode);
	document.documentElement.dataset.themePreference = preference;
	document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
};

const getStoredPreference = (): ThemePreference => {
	if (typeof window === 'undefined') return 'system';
	const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
	return isThemePreference(stored) ? stored : 'system';
};

export const useThemeStore = create<ThemeState>((set) => ({
	preference: 'system',
	isDarkMode: false,
	isHydrated: false,
	initializeTheme: () => {
		const preference = getStoredPreference();
		const isDarkMode = resolveDarkMode(preference);
		applyTheme(preference);
		set({ preference, isDarkMode, isHydrated: true });
	},
	setPreference: (preference) => {
		applyTheme(preference);
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(THEME_STORAGE_KEY, preference);
		}
		set({
			preference,
			isDarkMode: resolveDarkMode(preference),
			isHydrated: true,
		});
	},
	setMode: (isDarkMode) => {
		const preference: ThemePreference = isDarkMode ? 'dark' : 'light';
		applyTheme(preference);
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(THEME_STORAGE_KEY, preference);
		}
		set({ preference, isDarkMode, isHydrated: true });
	},
	toggleMode: () => {
		set((state) => {
			const isDarkMode = !state.isDarkMode;
			const preference: ThemePreference = isDarkMode ? 'dark' : 'light';
			applyTheme(preference);
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(THEME_STORAGE_KEY, preference);
			}
			return { preference, isDarkMode, isHydrated: true };
		});
	},
}));
