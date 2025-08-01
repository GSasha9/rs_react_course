import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, test } from 'vitest';

import ResultCard from './result-card';

import { store } from '@/store/store';

const mockData = {
  key: 'uid1',
  title: 'title',
  description: [{ hologram: 'false', mirror: 'false' }],
};

test('Result card renders correctly', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/search']}>
        <Routes>
          <Route path="/search" element={<ResultCard {...mockData} />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText(/title/i)).not.toBeNull();
  expect(screen.getByText(/hologram/i)).not.toBeNull();
});
