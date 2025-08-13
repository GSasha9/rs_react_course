import { useState } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ThemeContext } from './contexts/theme-context';
import router from './routers/router';
import { appStore } from './store';

export const App = () => {
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
