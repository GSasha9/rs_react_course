import { Outlet } from 'react-router';

import Header from '@/shared/ui/header/header';

const Root = () => {
  return (
    <>
      <Header></Header>
      <main className="main" data-testid="main">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
