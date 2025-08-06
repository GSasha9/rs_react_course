import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { expect, test, vi } from 'vitest';

import Input from '@/shared/ui/input/input';
import { appStore } from '@/store';

const mockCallback = vi.fn();
const mockProps = {
  type: 'text',
  placeholder: 'test placeholder',
  value: 'test value',
  onChange: mockCallback,
};

test('Input with given props renders correctly', async () => {
  render(
    <Provider store={appStore}>
      <Input {...mockProps} />
    </Provider>
  );

  const input = screen.getByPlaceholderText(
    /test placeholder/i
  ) as HTMLInputElement;

  expect(input).not.toBeNull();
  expect(input.value).toBe('test value');

  await userEvent.type(input, '123');

  expect(mockCallback).toBeCalled();
});
