import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
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
      <ResultCard {...mockData} />
    </Provider>
  );

  expect(screen.getByText(/title/i)).not.toBeNull();
  expect(screen.getByText(/hologram/i)).not.toBeNull();
});
