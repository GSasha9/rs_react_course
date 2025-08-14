import DetailedPage from '@/shared/components/search-page/detailed/detailed-page';
import SearchPage from '@/shared/components/search-page/search-page';

export const ROUTES = {
  searchPage: {
    path: 'search',
    element: <SearchPage />,
  },
  aboutPage: {
    path: 'about',
  },
  detailedPage: {
    path: ':page/:uid',
    element: <DetailedPage />,
  },
};
