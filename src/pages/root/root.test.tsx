import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

import Root from './root';

describe('Error page', () => {
  test('renders correctly', async () => {
    render(
      <MemoryRouter>
        <Root></Root>
      </MemoryRouter>
    );

    expect(screen.getByTestId('main')).toBeDefined();
  });
});
