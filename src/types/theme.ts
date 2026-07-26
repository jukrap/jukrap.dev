export type ThemePreference = 'system' | 'light' | 'dark';

export interface ThemeState {
	preference: ThemePreference;
	isDarkMode: boolean;
	isHydrated: boolean;
	initializeTheme: () => void;
	setPreference: (preference: ThemePreference) => void;
	setMode: (isDarkMode: boolean) => void;
	toggleMode: () => void;
}
