import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
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
      <MemoryRouter>
        <Pagination
          pages={mockProps.pages}
          activeNumber={mockProps.activeNumber}
        ></Pagination>
      </MemoryRouter>
    );

    const firstPage = screen.getByText('1');

    expect(firstPage).toBeDefined();
    expect(firstPage.classList.contains('active')).toBe(true);
    expect(screen.getAllByText('2')).toBeDefined();
  });
});
