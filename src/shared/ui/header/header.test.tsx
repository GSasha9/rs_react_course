import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import Header from './header';

describe('Header', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <Header></Header>
      </MemoryRouter>
    );

    expect(screen.getByText('Search page')).toBeDefined();
    expect(screen.getByText('About')).toBeDefined();
  });

  test('active class adds after clicking', async () => {
    render(
      <MemoryRouter>
        <Header></Header>
      </MemoryRouter>
    );

    const searchPage = screen.getByTestId('navSearch');
    const searchAbout = screen.getByTestId('navAbout');

    await userEvent.click(searchPage);
    expect(searchPage.classList.contains('active')).toBe(true);

    await userEvent.click(searchAbout);
    expect(searchPage.classList.contains('active')).toBe(false);
    expect(searchAbout.classList.contains('active')).toBe(true);
  });
});
