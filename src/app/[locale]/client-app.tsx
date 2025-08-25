'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useState } from 'react';
import { Provider } from 'react-redux';

import StoreProvider from './store-provider';

import { ThemeContext } from '@/contexts/theme-context';
import { setupStore } from '@/store';

interface ClientAppProps {
  children: React.ReactNode;
  messages: Record<string, string>;
  locale: string;
}

const store = setupStore();

export const ClientApp = ({ children, messages, locale }: ClientAppProps) => {
  const [nightTheme, setNightTheme] = useState(false);

  const toggleTheme = () => setNightTheme((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ nightTheme, toggleTheme }}>
      <Provider store={store}>
        <StoreProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </StoreProvider>
      </Provider>
    </ThemeContext.Provider>
  );
};
