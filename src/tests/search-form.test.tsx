import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import '@testing-library/user-event';
import SearchForm from '@/features/search/ui/search-form';

vi.mock('@/features/search/utils', () => ({
  startSearch: vi.fn(),
}));

import { startSearch } from '@/features/search/utils';

vi.mock('@/');

const mockOnResults = vi.fn();
const mockOnLoadingChange = vi.fn();

describe('Search form', () => {
  test('Form renders correctly', () => {
    render(
      <SearchForm
        onResults={mockOnResults}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    expect(screen.getByRole('combobox')).not.toBeNull();
    expect(screen.getByRole('textbox')).not.toBeNull();
    expect(screen.getByRole('button')).not.toBeNull();
  });

  test('Should be submitted with correct data', async () => {
    const mockResult = {
      page: {
        firstPage: true,
        lastPage: true,
        numberOfElements: 100,
        pageNumber: 0,
        pageSize: 1,
        totalElements: 1000,
        totalPages: 10,
      },
      sort: {
        direction: 'desc',
      },
      array: [1, 2, 3, 4],
    };

    (startSearch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResult);
    render(
      <SearchForm
        onResults={mockOnResults}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(mockOnLoadingChange).toHaveBeenCalledWith(true);
    expect(mockOnResults).toHaveBeenCalledWith([1, 2, 3, 4]);
    expect(mockOnLoadingChange).toHaveBeenCalledWith(false);
  });

  test('Should handle errors', async () => {
    const error = new Error('Something went wrong');
    const mockHandleError = vi.fn();

    (startSearch as ReturnType<typeof vi.fn>).mockRejectedValue(error);

    render(
      <SearchForm
        onResults={mockOnResults}
        onLoadingChange={mockOnLoadingChange}
        onError={mockHandleError}
      />
    );

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(mockHandleError).toBeCalled();
  });

  test('Select and input are changed correctly', async () => {
    const { rerender } = render(
      <SearchForm
        onResults={mockOnResults}
        onLoadingChange={mockOnLoadingChange}
      />
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const input = screen.getByRole('textbox') as HTMLSelectElement;

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
});
