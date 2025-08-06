import About from '@/pages/about/about';
import Root from '@/pages/root/root';
import DetailedPage from '@/pages/search-page/detailed/detailed-page';
import SearchPage from '@/pages/search-page/search-page';

export const ROUTES = {
  root: {
    path: '/',
    element: <Root />,
  },
  searchPage: {
    path: 'search',
    element: <SearchPage />,
  },
  aboutPage: {
    path: 'about',
    element: <About />,
  },
  detailedPage: {
    path: ':page/:uid',
    element: <DetailedPage />,
  },
};
