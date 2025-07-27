import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

import DetailedPage from './detailed-page';

describe('Detailed page', () => {
  const mockItem = {
    comics: {
      title: 'Test Comic',
      author: 'Test Author',
      year: 2023,
      nested: {
        publisher: 'Test Publisher',
      },
    },
  };

  test('renders correctly with item data', () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/details',
            state: { item: mockItem },
          },
        ]}
      >
        <DetailedPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('detailedPage')).toBeDefined();
    expect(screen.getByRole('button', { name: /close/i })).toBeDefined();
    expect(screen.getByText(/Test Comic/)).toBeDefined();
    expect(screen.getByText(/Test Author/)).toBeDefined();
    expect(screen.getByText(/Test Publisher/)).toBeDefined();
  });
});
