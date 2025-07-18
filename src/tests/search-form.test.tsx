import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { mockResponse } from './test-utils/mocks';

import '@testing-library/user-event';
import SearchForm from '@/features/search/ui/search-form';

vi.mock('@/features/search/utils', () => ({
  startSearch: vi.fn(),
}));

import { startSearch } from '@/features/search/utils';

const mockOnResults = vi.fn();
const mockOnLoadingChange = vi.fn();

const renderForm = (props = {}) =>
  render(
    <SearchForm
      onResults={mockOnResults}
      onLoadingChange={mockOnLoadingChange}
      {...props}
    />
  );

describe('Search form', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });
  test('Form renders correctly', () => {
    renderForm();

    expect(screen.getByRole('combobox')).not.toBeNull();
    expect(screen.getByRole('textbox')).not.toBeNull();
    expect(screen.getByRole('button')).not.toBeNull();
  });

  test('Should be submitted by search button with correct data', async () => {
    (startSearch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);
    renderForm();

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(mockOnLoadingChange).toHaveBeenCalledWith(true);
    expect(mockOnResults).toHaveBeenCalledWith([1, 2, 3, 4]);
    expect(mockOnLoadingChange).toHaveBeenCalledWith(false);
  });

  test('Should get previous search query from LocalStorage', () => {
    const getItemSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue('animal');

    renderForm();

    expect(getItemSpy).toHaveBeenCalledWith('prevSearchInput');
    expect(getItemSpy).toHaveBeenCalledWith('prevSearchSelect');
    expect(getItemSpy).toHaveBeenCalledTimes(2);
  });

  test('Select and input are changed correctly', async () => {
    const { rerender } = renderForm();

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const input = screen.getByRole('textbox') as HTMLInputElement;

    await userEvent.selectOptions(select, 'animal');
    await userEvent.type(input, 'test');

    rerender(
      <SearchForm
        onResults={mockOnResults}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    expect(select.value).toBe('animal');
    expect(input.value).toBe('test');
  });

  test('Should render default values if localStorage is empty', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    renderForm();

    expect(localStorage.getItem).toHaveBeenCalledWith('prevSearchInput');
    expect(localStorage.getItem).toHaveBeenCalledWith('prevSearchSelect');

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(select.value).toBe('company');
    expect(input.value).toBe('');
  });

  test('form submits by key', async () => {
    const { container } = renderForm();

    const form = container.querySelector('form') as HTMLFormElement;

    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockOnLoadingChange).toHaveBeenCalledWith(true);
      expect(mockOnLoadingChange).toHaveBeenCalledWith(false);
    });
  });
});
