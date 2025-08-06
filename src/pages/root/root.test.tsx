import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import Root from './root';

import { appStore } from '@/store';

describe('Error page', () => {
  test('renders main section', () => {
    render(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Root />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });
});
