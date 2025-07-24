import { createBrowserRouter } from 'react-router';

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
        index: true,
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;
