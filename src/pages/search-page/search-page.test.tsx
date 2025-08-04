import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';

import SearchForm from './search-form/ui/search-form';

import SearchPage from '@/pages/search-page/search-page';

vi.mock('./search-form/utils', () => ({
  startSearch: vi.fn(),
}));

import { Provider } from 'react-redux';

import { startSearch } from './search-form/utils';

import { appStore } from '@/store/app-store';

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

  test('search button onClick changes loading state and shows spinner', async () => {
    let resolveSearch: (value: unknown) => void;

    (startSearch as ReturnType<typeof vi.fn>).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSearch = resolve;
        })
    );

    render(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={['/search']}>
          <Routes>
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const buttonSearch = screen.getByRole('button', { name: 'search' });

    await userEvent.click(buttonSearch);

    const spinner = await screen.findByTestId('spinner');

    expect(spinner).toBeInTheDocument();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    resolveSearch!({ array: [], page: { totalPages: 1 }, sort: {} });
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
                  onResults={vi.fn()}
                  onLoadingChange={vi.fn()}
                  pageNumber={1}
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

  test('calls startSearch with correct args', async () => {
    const mockData = { array: ['test'], page: {}, sort: {} };

    (startSearch as ReturnType<typeof vi.fn>).mockResolvedValue(mockData);

    render(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={['/search']}>
          <Routes>
            <Route
              path="/search"
              element={
                <SearchForm
                  onResults={vi.fn()}
                  onLoadingChange={vi.fn()}
                  pageNumber={1}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'search' });

    await userEvent.type(input, 'startrek');
    await userEvent.click(button);

    await waitFor(() => {
      expect(startSearch).toHaveBeenCalledWith('startrek', 1);
    });
  });

  test('logs error when startSearch fails', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const error = new Error('Search failed');

    (startSearch as ReturnType<typeof vi.fn>).mockRejectedValue(error);

    render(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={['/search']}>
          <Routes>
            <Route
              path="/search"
              element={
                <SearchForm
                  onResults={vi.fn()}
                  onLoadingChange={vi.fn()}
                  pageNumber={1}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole('button', { name: 'search' });

    await userEvent.click(button);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    });

    consoleErrorSpy.mockRestore();
  });
});
