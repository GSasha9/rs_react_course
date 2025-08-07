import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';

import SearchForm from './search-form/ui/search-form';

import SearchPage from '@/pages/search-page/search-page';
import { appStore } from '@/store';

describe('Search Page', () => {
  test('renders search form', () => {
    render(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={['/search']}>
          <Routes>
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'search' })).toBeInTheDocument();
  });

  test('updates query state on input change', async () => {
    render(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={['/search']}>
          <Routes>
            <Route
              path="/search"
              element={
                <SearchForm
                  onSearch={vi.fn()}
                  pageNumber={1}
                  disabled={false}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'startrek');
    expect((input as HTMLInputElement).value).toBe('startrek');
  });
});
