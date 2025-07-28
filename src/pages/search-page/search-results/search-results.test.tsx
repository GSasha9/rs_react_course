import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import SearchResults from './search-results';

import { mockResult } from '@/tests/test-utils/mocks';

describe('Search Results', () => {
  test('all results added to container', () => {
    const { container, rerender } = render(
      <MemoryRouter initialEntries={['/search']}>
        <Routes>
          <Route
            path="/search"
            element={<SearchResults results={mockResult} page={1} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(container.firstChild?.childNodes.length).toBe(5);

    const newMockResults = [
      { mirror: true, name: '777 Teta', uid: 'CHMA0000215043' },
      { mirror: true, title: '777 Teta', uid: 'CHMA0000215044' },
      { mirror: true, name: '', uid: 'CHMA0000215045' },
      { mirror: true, title: '', uid: 'CHMA0000215046' },
      { mirror: true, uid: 'CHMA0000215047', title: null, name: null },
      { mirror: true, name: 'New item', uid: 'CHMA0000215048' },
    ];

    rerender(
      <MemoryRouter initialEntries={['/search']}>
        <Routes>
          <Route
            path="/search"
            element={<SearchResults results={newMockResults} page={1} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(container.firstChild?.childNodes.length).toBe(6);
  });

  test('result card with no title or name renders correctly', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/search']}>
        <Routes>
          <Route
            path="/search"
            element={<SearchResults results={mockResult} page={1} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getAllByText('No title').length).toBe(4);
    expect(container.firstChild?.childNodes.length).toBe(5);
  });
});
