import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';

vi.mock('@/services/api/comics-api.ts', () => ({
  default: {
    fetchDataById: vi.fn().mockResolvedValue({}),
  },
}));

import SearchResults from './search-results';

import { store } from '@/store/store';
import { mockResult } from '@/tests/test-utils/mocks';

describe('Search Results', () => {
  test('all results added to container', () => {
    const { container, rerender } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search']}>
          <Routes>
            <Route
              path="/search"
              element={<SearchResults results={mockResult} page={1} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
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
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search']}>
          <Routes>
            <Route
              path="/search"
              element={<SearchResults results={newMockResults} page={1} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(container.firstChild?.childNodes.length).toBe(6);
  });

  test('result card with no title or name renders correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search']}>
          <Routes>
            <Route
              path="/search"
              element={<SearchResults results={mockResult} page={1} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const noTitleElements = screen.getAllByText('No title');

    expect(noTitleElements).toHaveLength(4);
    expect(container.firstChild?.childNodes.length).toBe(5);
  });
});
