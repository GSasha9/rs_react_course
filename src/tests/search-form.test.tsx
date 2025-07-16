import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import '@testing-library/user-event';
import SearchForm from '@/features/search/ui/search-form';

vi.mock('@/features/search/utils', () => ({
  startSearch: vi.fn(),
}));

import { startSearch } from '@/features/search/utils';

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

  test('Should be submitted correctly', async () => {
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
});
