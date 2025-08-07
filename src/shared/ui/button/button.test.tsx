import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import Button from '@/shared/ui/button/button';

describe('Button render correctly', () => {
  test('Button renders with correct text', () => {
    const mockData = {
      text: 'Test text',
    };
    const { rerender } = render(<Button {...mockData} />);

    expect(screen.getByText(mockData.text)).not.toBeNull();

    rerender(<Button text={'search'} />);

    expect(screen.getByRole('button', { name: 'search' })).not.toBeNull();
  });

  test('Button click handler called', async () => {
    const mockHandlerClick = vi.fn();

    render(<Button callback={mockHandlerClick} text={'Click me'} />);

    const button = screen.getByRole('button', { name: 'Click me' });

    await userEvent.click(button);
    expect(mockHandlerClick).toHaveBeenCalled();
  });
});
