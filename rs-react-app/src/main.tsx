import { StrictMode } from 'react';
import * as ReactDom from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store';

import './main.scss';

const container = document.getElementById('root');

if (!container) throw new Error('Root container not found');

ReactDom.createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
