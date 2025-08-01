import { useState } from 'react';
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

  return (
    <>
      <ThemeContext.Provider value={{ nightTheme }}>
        <Header></Header>
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
