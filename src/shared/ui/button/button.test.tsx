import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, test, vi } from 'vitest';

import Button from '@/shared/ui/button/button';
import { setupStore } from '@/store';

describe('Button', () => {
  test('renders with correct text', () => {
    const mockData = {
      text: 'Test text',
    };
    const { rerender } = render(
      <Provider store={setupStore()}>
        <Button {...mockData} />
      </Provider>
    );

    expect(screen.getByText(mockData.text)).toBeInTheDocument();

    rerender(
      <Provider store={setupStore()}>
        <Button text={'search'} />
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'search' })).toBeInTheDocument();
  });

  test('click handler called', async () => {
    const mockHandlerClick = vi.fn();

    render(
      <Provider store={setupStore()}>
        <Button callback={mockHandlerClick} text={'Click me'} />
      </Provider>
    );

    const button = screen.getByRole('button', { name: 'Click me' });

    await userEvent.click(button);
    expect(mockHandlerClick).toHaveBeenCalled();
  });
});
