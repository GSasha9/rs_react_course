import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

import About from './about';

describe('About page', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
    expect(screen.getByRole('link', { name: /rs school/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /react course/i })).toBeDefined();
  });
});
