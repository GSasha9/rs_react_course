import { createContext } from 'react';

interface ThemeContextType {
  nightTheme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  nightTheme: false,
  toggleTheme: () => {},
});
