export interface ThemeContextType {
	isDarkMode: boolean;
	toggleMode: () => void;
}

export type ThemeState = ThemeContextType;
