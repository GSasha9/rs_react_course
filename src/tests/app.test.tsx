import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

import App from '@/App';

test('App renders correctly', () => {
  const { container } = render(<App />);

  const sections = container.querySelectorAll('section');
  const main = container.querySelector('main');

  expect(sections.length).toBe(2);
  expect(main).toBeDefined();
});
