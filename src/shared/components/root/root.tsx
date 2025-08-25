'use client';

import './root.scss';
import '../../../styles/style.scss';

import { useTheme } from '@/hooks/use-theme';
import Button from '@/shared/ui/button/button';
import Header from '@/shared/ui/header/header';

const Root = ({ children }: { children: React.ReactNode }) => {
  const { nightTheme, toggleTheme } = useTheme();

  return (
    <>
      <Header className={`${nightTheme ? ' night-theme' : ''}`}></Header>
      <Button
        className={`theme${nightTheme ? ' night' : ''}`}
        callback={toggleTheme}
      ></Button>
      <main
        className={`main${nightTheme ? ' night-theme' : ''}`}
        data-testid="main"
      >
        {children}
      </main>
    </>
  );
};

export default Root;
