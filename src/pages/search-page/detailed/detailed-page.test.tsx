import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import DetailedPage from './detailed-page';

import { store } from '@/store/store';

const mockItem = {
  comics: {
    title: 'Test Comic',
    author: 'Test Author',
    year: 2023,
    nested: {
      publisher: 'Test Publisher',
    },
  },
};

describe('Detailed page', () => {
  test('renders detailed page correctly with route state', () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: '/details', state: { item: mockItem } }]}
        >
          <Routes>
            <Route path="/details" element={<DetailedPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('detailedPage')).toBeDefined();
    expect(screen.getByRole('button', { name: /close/i })).toBeDefined();
    expect(screen.getByText(/Test Comic/)).toBeDefined();
    expect(screen.getByText(/Test Author/)).toBeDefined();
    expect(screen.getByText(/Test Publisher/)).toBeDefined();
  });
});
