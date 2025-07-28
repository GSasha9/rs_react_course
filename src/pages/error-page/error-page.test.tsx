import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import ErrorPage from './error-page';

describe('Error page', () => {
  test('renders correctly', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/error']}>
        <Routes>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Error 404')).toBeDefined();

    const backHomeBtn = screen.getByRole('link');

    expect(backHomeBtn).toBeDefined();

    await user.click(backHomeBtn);
  });
});
