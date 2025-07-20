import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import '@testing-library/user-event';
import Fallback from '@/shared/ui/error-boundary/fallback.tsx';

const mockCallback = vi.fn();

const mockData = {
  message: 'Error message',
  onClick: mockCallback,
};

test('Fallback renders correctly', async () => {
  render(<Fallback {...mockData} />);

  const button = screen.getByRole('button');

  expect(button).not.toBeNull();

  await userEvent.click(button);

  expect(mockCallback).toBeCalled();
});
