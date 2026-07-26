import type {
	ResolvedTheme,
	ThemePreference,
} from '@/types/portfolioExperiment';

export interface ThemeState {
	preference: ThemePreference;
	resolvedTheme: ResolvedTheme;
	isDarkMode: boolean;
	isHydrated: boolean;
	initializeTheme: () => void;
	setPreference: (preference: ThemePreference) => void;
	setMode: (isDarkMode: boolean) => void;
	toggleMode: () => void;
}
