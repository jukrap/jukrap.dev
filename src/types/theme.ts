export interface ThemeState {
	isDarkMode: boolean;
	isHydrated: boolean;
	initializeTheme: () => void;
	setMode: (isDarkMode: boolean) => void;
	toggleMode: () => void;
}
