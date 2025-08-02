import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import SearchForm from './search-form';

import '@testing-library/user-event';
import { appStore } from '@/store/app-store';
import { mockResponse } from '@/tests/test-utils/mocks';

vi.mock('../utils', () => ({
  startSearch: vi.fn(),
}));

import { startSearch } from '../utils';

const mockOnResults = vi.fn();
const mockOnLoadingChange = vi.fn();
const pageNumber = 20;

const renderForm = (props = {}) =>
  render(
    <Provider store={appStore}>
      <MemoryRouter initialEntries={['/search']}>
        <Routes>
          <Route
            path="/search"
            element={
              <SearchForm
                onResults={mockOnResults}
                onLoadingChange={mockOnLoadingChange}
                pageNumber={pageNumber}
                {...props}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

describe('Search form', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });
  test('renders correctly', () => {
    renderForm();

    expect(screen.getByRole('textbox')).not.toBeNull();
    expect(screen.getByRole('button')).not.toBeNull();
  });

  test('should be submitted by search button with correct data', async () => {
    (startSearch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);
    renderForm();

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(mockOnLoadingChange).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(mockOnResults).toHaveBeenCalledWith(mockResponse);
      expect(mockOnLoadingChange).toHaveBeenCalledWith(false);
    });
  });

  test('should get previous search query from LocalStorage', () => {
    const getItemSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue('comics');

    renderForm();

    expect(getItemSpy).toHaveBeenCalledWith('prevSearchInput');
    expect(getItemSpy).toHaveBeenCalledTimes(1);
  });

  test('select and input are changed correctly', async () => {
    const { rerender } = renderForm();

    const input = screen.getByRole('textbox') as HTMLInputElement;

    await userEvent.type(input, 'test');

    rerender(
      <SearchForm
        onResults={mockOnResults}
        onLoadingChange={mockOnLoadingChange}
        pageNumber={pageNumber}
      />
    );

    expect(input.value).toBe('test');
  });

  test('should render default values if localStorage is empty', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    renderForm();

    expect(localStorage.getItem).toHaveBeenCalledWith('prevSearchInput');

    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input.value).toBe('');
  });

  test('form submits by key', async () => {
    renderForm();

    const form = screen.getByTestId('search-form') as HTMLFormElement;

    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockOnLoadingChange).toHaveBeenCalledWith(true);
      expect(mockOnLoadingChange).toHaveBeenCalledWith(false);
    });
  });
});
