import { useContext } from 'react';

import { ThemeContext } from '@/contexts/theme-context';

export const useTheme = () => {
  const { nightTheme, toggleTheme } = useContext(ThemeContext);

  if (nightTheme === undefined) {
    throw new Error('useTheme must be used within a ThemeContext.Provider');
  }

  return {
    nightTheme,
    toggleTheme,
  };
};
