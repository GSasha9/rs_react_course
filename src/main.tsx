import { StrictMode } from 'react';
import { useState } from 'react';
import * as ReactDom from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ThemeContext } from './contexts/theme-context';
import router from './routers/router';
import { appStore } from './store';

import './styles/style.scss';

const container = document.getElementById('root');

if (!container) throw new Error('Root container not found');

export const ThemeProviderWrapper = () => {
  const [nightTheme, setNightTheme] = useState(false);

  const toggleTheme = () => {
    setNightTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ nightTheme, toggleTheme }}>
      <Provider store={appStore}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeContext.Provider>
  );
};

ReactDom.createRoot(container).render(
  <StrictMode>
    <ThemeProviderWrapper></ThemeProviderWrapper>
  </StrictMode>
);
