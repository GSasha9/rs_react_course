import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import Spinner from '@/shared/ui/spinner/spinner';

test('Spinner renders without crash', () => {
  render(<Spinner>Text content</Spinner>);

  expect(screen.getByText('Text content')).not.toBeNull();
});
