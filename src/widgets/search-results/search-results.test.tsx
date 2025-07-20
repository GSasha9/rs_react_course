import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { moсkResult } from '../../tests/test-utils/mocks';

import SearchResults from '@/widgets/search-results/search-results';

describe('Search Results', () => {
  test('all results added to container', () => {
    const { container, rerender } = render(
      <SearchResults results={moсkResult} />
    );

    expect(container.firstChild?.childNodes.length).toBe(5);

    const newMockResults = [
      {
        mirror: true,
        name: '777 Teta',
        uid: 'CHMA0000215043',
      },
      {
        mirror: true,
        title: '777 Teta',
        uid: 'CHMA0000215044',
      },
      {
        mirror: true,
        name: '',
        uid: 'CHMA0000215045',
      },
      {
        mirror: true,
        title: '',
        uid: 'CHMA0000215046',
      },
      {
        mirror: true,
        uid: 'CHMA0000215047',
        title: null,
        name: null,
      },
      {
        mirror: true,
        name: 'New item',
        uid: 'CHMA0000215048',
      },
    ];

    rerender(<SearchResults results={newMockResults} />);

    expect(container.firstChild?.childNodes.length).toBe(6);
  });

  test('result card with no title or name renders correctly', () => {
    const { container } = render(<SearchResults results={moсkResult} />);

    expect(screen.getAllByText('No title').length).toBe(4);
    expect(container.firstChild?.childNodes.length).toBe(5);
  });
});
