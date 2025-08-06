import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import DetailedPage from './detailed-page';

import { appStore } from '@/store';

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
      <Provider store={appStore}>
        <MemoryRouter
          initialEntries={[{ pathname: '/details', state: { item: mockItem } }]}
        >
          <Routes>
            <Route path="/details" element={<DetailedPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('detailedPage')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    expect(screen.getByText(/Test Comic/)).toBeInTheDocument();
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
    expect(screen.getByText(/Test Publisher/)).toBeInTheDocument();
  });
});
