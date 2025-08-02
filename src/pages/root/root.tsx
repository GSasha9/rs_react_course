import { useState } from 'react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import './root.scss';
import '../../styles/style.scss';

import { ThemeContext } from '@/shared/models/contexts/theme-context';
import Button from '@/shared/ui/button/button';
import Header from '@/shared/ui/header/header';

const Root = () => {
  const [nightTheme, setNightTheme] = useState(false);

  const toggleTheme = () => {
    setNightTheme((prevNightTheme) => !prevNightTheme);
  };

  useEffect(() => {
    const root = document.getElementById('root');

    if (!root) return;

    if (nightTheme) {
      root.classList.add('night-theme');
    } else {
      root.classList.remove('night-theme');
    }
  });

  return (
    <>
      <ThemeContext.Provider value={{ nightTheme }}>
        <Header className={`${nightTheme} ? ' night-theme' : ''`}></Header>
        <Button
          className={`theme${nightTheme ? ' night' : ''}`}
          callback={toggleTheme}
        ></Button>
        <main
          className={`main${nightTheme ? ' night-theme' : ''}`}
          data-testid="main"
        >
          <Outlet />
        </main>
      </ThemeContext.Provider>
    </>
  );
};

export default Root;
