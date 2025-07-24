import { createBrowserRouter } from 'react-router';

import About from '@/pages/about/about';
import ErrorPage from '@/pages/error-page/error-page';
import Root from '@/pages/root/root';
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
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]);

export default router;
