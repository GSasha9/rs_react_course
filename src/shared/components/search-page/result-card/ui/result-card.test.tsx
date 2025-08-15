import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import ResultCard from './result-card';

import { setupStore } from '@/store';

const mockData = {
  key: 'uid1',
  title: 'title',
  description: [{ hologram: 'false', mirror: 'false' }],
};

describe('Result card', () => {
  test('should display title and hologram', () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter initialEntries={['/search']}>
          <Routes>
            <Route path="/search" element={<ResultCard {...mockData} />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/title/i)).toBeVisible();
    expect(screen.getByText(/hologram/i)).toBeVisible();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});
