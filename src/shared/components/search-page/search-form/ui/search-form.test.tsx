import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import SearchForm from './search-form';

import '@testing-library/user-event';
import { setupStore } from '@/store';

const mockOnSearch = vi.fn();
const pageNumber = 20;

const renderForm = (props = {}) =>
  render(
    <Provider store={setupStore()}>
      <MemoryRouter initialEntries={['/search']}>
        <Routes>
          <Route
            path="/search"
            element={
              <SearchForm
                onSearch={mockOnSearch}
                pageNumber={pageNumber}
                disabled={false}
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
  test('renders form whit text input and search button', () => {
    renderForm();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('select and input are changed correctly', async () => {
    const { rerender } = renderForm();

    const input = screen.getByRole('textbox') as HTMLInputElement;

    await userEvent.type(input, 'test');

    rerender(
      <Provider store={setupStore()}>
        {' '}
        <SearchForm
          onSearch={mockOnSearch}
          pageNumber={pageNumber}
          disabled={true}
        />
      </Provider>
    );

    expect(input.value).toBe('test');
  });

  test('form submits by key', async () => {
    renderForm();

    const form = screen.getByTestId('search-form') as HTMLFormElement;

    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalled();
    });
  });
});
