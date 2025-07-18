import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import SearchForm from '@/features/search/ui/search-form';
import SearchPage from '@/pages/search-page/search-page';

vi.mock('@/features/search/utils', () => ({
  startSearch: vi.fn(),
}));

import { startSearch } from '@/features/search/utils';

describe('Search Page', () => {
  test('renders correctly', () => {
    render(<SearchPage />);

    expect(screen.getByRole('combobox')).toBeDefined();
    expect(screen.getByRole('textbox')).toBeDefined();
    expect(screen.getByRole('button', { name: 'search' })).toBeDefined();
    expect(
      screen.getByRole('button', { name: 'throw Page Error' })
    ).toBeDefined();
  });

  test('search button onClick changes loading state and show spinner', async () => {
    const { container } = render(<SearchPage />);

    const buttonSearch = screen.getByRole('button', { name: 'search' });

    await userEvent.click(buttonSearch);

    const spinner = container.querySelector('.spinner');

    await waitFor(() => {
      expect(spinner).toBeDefined();
    });
  });

  test('updates query state on input change', async () => {
    render(<SearchForm onResults={vi.fn()} onLoadingChange={vi.fn()} />);

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'startrek');

    expect((input as HTMLInputElement).value).toBe('startrek');
  });

  test('calls startSearch with correct args', async () => {
    const mockResult = { array: ['test'], page: {}, sort: {} };

    (startSearch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResult);

    render(<SearchForm onResults={vi.fn()} onLoadingChange={vi.fn()} />);

    const input = screen.getByRole('textbox');
    const select = screen.getByRole('combobox');
    const button = screen.getByRole('button', { name: 'search' });

    await userEvent.selectOptions(select, 'animal');
    await userEvent.type(input, 'lion');
    await userEvent.click(button);

    expect(startSearch).toHaveBeenCalledWith('animal', 'lion');
  });

  test('logs error when startSearch fails', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const error = new Error('Search failed');

    (startSearch as ReturnType<typeof vi.fn>).mockRejectedValue(error);

    render(<SearchForm onResults={vi.fn()} onLoadingChange={vi.fn()} />);

    const button = screen.getByRole('button', { name: 'search' });

    await userEvent.click(button);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    });

    consoleErrorSpy.mockRestore();
  });
});
