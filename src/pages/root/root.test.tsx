import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import Root from './root';

describe('Error page', () => {
  test('renders main seaction', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Root />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });
});
