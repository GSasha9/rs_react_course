import { createBrowserRouter } from 'react-router';

import About from '@/pages/about/about';
import ErrorPage from '@/pages/error-page/error-page';
import Root from '@/pages/root/root';
import DetailedPage from '@/pages/search-page/detailed-page/detailed-page';
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
  deatiledPage: {
    path: ':page/:uid',
    element: <DetailedPage />,
  },
};

const router = createBrowserRouter([
  {
    path: ROUTES.root.path,
    element: ROUTES.root.element,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.searchPage.path,
        element: ROUTES.searchPage.element,
        children: [
          {
            path: ROUTES.deatiledPage.path,
            element: ROUTES.deatiledPage.element,
          },
        ],
      },
      {
        path: ROUTES.aboutPage.path,
        element: ROUTES.aboutPage.element,
      },
    ],
  },
]);

export default router;
