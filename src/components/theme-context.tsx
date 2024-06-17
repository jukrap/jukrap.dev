'use client';
import { createContext, useContext, useState } from 'react';

type ThemeContextType = {
	isDarkMode: boolean;
	toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
	isDarkMode: false,
	toggleMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleMode = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleMode }}>
			{children}
		</ThemeContext.Provider>
	);
};
