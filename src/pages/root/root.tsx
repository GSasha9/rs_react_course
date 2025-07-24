import SearchPage from '../search-page/search-page';

import Header from '@/shared/ui/header/header';

const Root = () => {
  return (
    <>
      <Header></Header>
      <main className="main" data-testid="main">
        <SearchPage />
      </main>
    </>
  );
};

export default Root;
