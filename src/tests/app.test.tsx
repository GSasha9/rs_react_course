import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import App from '@/App';

test('App renders correctly', () => {
  render(<App />);

  const sections = screen.getAllByTestId('section');
  const main = screen.getAllByTestId('main');

  expect(sections.length).toBe(2);
  expect(main).toBeDefined();
});
