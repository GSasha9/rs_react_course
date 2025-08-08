import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import SearchForm from './search-form/ui/search-form';

import SearchPage from '@/pages/search-page/search-page';
import { appStore } from '@/store';
import { server } from '@/tests/test-utils/mocks/setup-server';

describe('Search Page', () => {
  beforeEach(() => {
    server.resetHandlers();
    server.use(
      http.get('https://stapi.co/api/v1/rest/comics/search', () => {
        return HttpResponse.error();
      })
    );
  });
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

  test('shows error message on failed fetch', async () => {
    render(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={['/search']}>
          <Routes>
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(
      await screen.findByText(
        /Something went wrong. Please try again./i,
        {},
        { timeout: 4000 }
      )
    ).toBeInTheDocument();
  });
});
