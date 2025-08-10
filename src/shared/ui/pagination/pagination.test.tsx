import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import type { paginationProps } from './model/interfaces';
import Pagination from './pagination';

const mockProps: paginationProps = {
  pages: 2,
  activeNumber: 1,
};

describe('Pagination', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <Pagination
                pages={mockProps.pages}
                activeNumber={mockProps.activeNumber}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const firstPage = screen.getByText('1');

    expect(firstPage).toBeDefined();
    expect(firstPage.classList.contains('active')).toBe(true);
    expect(screen.getAllByText('2')).toBeDefined();
  });
});
