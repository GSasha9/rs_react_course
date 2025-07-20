import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import ResultCard from '@/entities/result-card/ui/result-card';

const mockData = {
  key: 'uid1',
  title: 'title',
  description: [{ hologram: 'false', mirror: 'false' }],
};

test('Result card renders correctly', () => {
  render(<ResultCard {...mockData} />);

  expect(screen.getByText(/title/i)).not.toBeNull();
  expect(screen.getByText(/hologram/i)).not.toBeNull();
});
