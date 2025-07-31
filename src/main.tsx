import { StrictMode } from 'react';
import * as ReactDom from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './routers/router';

import './styles/style.scss';

const container = document.getElementById('root');

if (!container) throw new Error('Root container not found');

ReactDom.createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
