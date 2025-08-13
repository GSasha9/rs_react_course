'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';

import { ThemeContext } from '../contexts/theme-context';
import { appStore } from '../store';

export const ClientApp = ({ children }: { children: React.ReactNode }) => {
  const [nightTheme, setNightTheme] = useState(false);

  const toggleTheme = () => {
    setNightTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ nightTheme, toggleTheme }}>
      <Provider store={appStore}>{children}</Provider>
    </ThemeContext.Provider>
  );
};
