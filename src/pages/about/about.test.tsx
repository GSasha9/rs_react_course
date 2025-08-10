import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import About from './about';

describe('About page', () => {
  test('renders title and links', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /school/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /react course/i })
    ).toBeInTheDocument();
  });
});
