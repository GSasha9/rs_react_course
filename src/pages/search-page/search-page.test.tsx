import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';

import SearchForm from './search-form/ui/search-form';

import SearchPage from '@/pages/search-page/search-page';

vi.mock('./search-form/utils', () => ({
  startSearch: vi.fn(),
}));

import { startSearch } from './search-form/utils';

describe('Search Page', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('textbox')).toBeDefined();
    expect(screen.getByRole('button', { name: 'search' })).toBeDefined();
  });

  test('search button onClick changes loading state and show spinner', async () => {
    (startSearch as ReturnType<typeof vi.fn>).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ array: [], page: {}, sort: {} }), 100)
        )
    );

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    const buttonSearch = screen.getByRole('button', { name: 'search' });

    await userEvent.click(buttonSearch);

    const spinner = await screen.findByTestId('spinner');

    expect(spinner).toBeDefined();
  });

  test('updates query state on input change', async () => {
    render(
      <SearchForm
        onResults={vi.fn()}
        onLoadingChange={vi.fn()}
        pageNumber={1}
      />
    );

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'startrek');

    expect((input as HTMLInputElement).value).toBe('startrek');
  });

  test('calls startSearch with correct args', async () => {
    const mockData = { array: ['test'], page: {}, sort: {} };

    (startSearch as ReturnType<typeof vi.fn>).mockResolvedValue(mockData);

    render(
      <SearchForm
        onResults={vi.fn()}
        onLoadingChange={vi.fn()}
        pageNumber={1}
      />
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
      <SearchForm
        onResults={vi.fn()}
        onLoadingChange={vi.fn()}
        pageNumber={1}
      />
    );

    const button = screen.getByRole('button', { name: 'search' });

    await userEvent.click(button);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    });

    consoleErrorSpy.mockRestore();
  });

  test('handleResults updates results state and renders results', async () => {
    const mockData = [{ id: 1, title: 'Test result' }];

    (startSearch as ReturnType<typeof vi.fn>).mockResolvedValue({
      array: mockData,
      page: {},
      sort: {},
    });

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'search' });

    await userEvent.type(input, 'test');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Test result')).toBeDefined();
    });
  });
});
