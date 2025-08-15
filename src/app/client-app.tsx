'use client';

import { useState } from 'react';

import StoreProvider from './store-provider';

import { ThemeContext } from '@/contexts/theme-context';

export const ClientApp = ({ children }: { children: React.ReactNode }) => {
  const [nightTheme, setNightTheme] = useState(false);

  const toggleTheme = () => {
    setNightTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ nightTheme, toggleTheme }}>
      <StoreProvider>{children}</StoreProvider>
    </ThemeContext.Provider>
  );
};
