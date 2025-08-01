import { createContext } from 'react';

interface ThemeContextType {
  nightTheme: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  nightTheme: false,
});
