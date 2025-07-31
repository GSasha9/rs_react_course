import { createBrowserRouter } from 'react-router';

import { ROUTES } from './routes';

import ErrorPage from '@/pages/error-page/error-page';

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
