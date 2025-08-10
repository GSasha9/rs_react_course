import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import Header from './header';

describe('Header', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="*" element={<Header />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Search page')).toBeDefined();
    expect(screen.getByText('About')).toBeDefined();
  });
});
