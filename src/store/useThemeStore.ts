import { create } from 'zustand';
import { ThemeState } from '@/types/theme';
import type {
	ResolvedTheme,
	ThemePreference,
} from '@/types/portfolioExperiment';

export const THEME_STORAGE_KEY = 'jukrap.theme.graphic';

const resolveTheme = (preference: ThemePreference): ResolvedTheme => {
	if (preference === 'dark') return 'dark';
	if (preference === 'light') return 'light';
	if (typeof window === 'undefined') return 'dark';
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
};

const applyTheme = (preference: ThemePreference) => {
	if (typeof document === 'undefined') return;
	const resolvedTheme = resolveTheme(preference);
	document.documentElement.dataset.theme = resolvedTheme;
	document.documentElement.dataset.themePreference = preference;
	document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
	document.documentElement.style.colorScheme = resolvedTheme;
	return resolvedTheme;
};

const getStoredPreference = (): ThemePreference => {
	if (typeof window === 'undefined') return 'system';
	const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
	return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'system';
};

export const useThemeStore = create<ThemeState>((set) => ({
	preference: 'system',
	resolvedTheme: 'dark',
	isDarkMode: true,
	isHydrated: false,
	initializeTheme: () => {
		const preference = getStoredPreference();
		const resolvedTheme = applyTheme(preference) ?? resolveTheme(preference);
		set({
			preference,
			resolvedTheme,
			isDarkMode: resolvedTheme === 'dark',
			isHydrated: true,
		});
	},
	setPreference: (preference) => {
		if (typeof window !== 'undefined') {
			if (preference === 'system')
				window.localStorage.removeItem(THEME_STORAGE_KEY);
			else window.localStorage.setItem(THEME_STORAGE_KEY, preference);
		}
		const resolvedTheme = applyTheme(preference) ?? resolveTheme(preference);
		set({
			preference,
			resolvedTheme,
			isDarkMode: resolvedTheme === 'dark',
			isHydrated: true,
		});
	},
	setMode: (isDarkMode) => {
		useThemeStore.getState().setPreference(isDarkMode ? 'dark' : 'light');
	},
	toggleMode: () => {
		const state = useThemeStore.getState();
		state.setPreference(state.isDarkMode ? 'light' : 'dark');
	},
}));
