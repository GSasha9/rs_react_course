import { createBrowserRouter } from 'react-router';

import About from '@/pages/about/about';
import ErrorPage from '@/pages/error-page/error-page';
import Root from '@/pages/root/root';
import DetailedPage from '@/pages/search-page/detailed-page/detailed-page';
import SearchPage from '@/pages/search-page/search-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/search',
        element: <SearchPage />,
        children: [
          {
            path: ':select/:uid',
            element: <DetailedPage />,
          },
        ],
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]);

export default router;
