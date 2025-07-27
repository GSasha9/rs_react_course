import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

import ErrorPage from './error-page';

describe('Error page', () => {
  test('renders correctly', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ErrorPage></ErrorPage>
      </MemoryRouter>
    );

    expect(screen.getByText('Error 404')).toBeDefined();

    const backHomeBtn = screen.getByRole('link');

    expect(backHomeBtn).toBeDefined();

    await user.click(backHomeBtn);

    expect(backHomeBtn.getAttribute('href')).toBe('/');
  });
});
