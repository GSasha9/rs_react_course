import { StrictMode } from 'react';
import * as ReactDom from 'react-dom/client';

import { App } from './app';

import './styles/style.scss';

const container = document.getElementById('root');

if (!container) throw new Error('Root container not found');

ReactDom.createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
