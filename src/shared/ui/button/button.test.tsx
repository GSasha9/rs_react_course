import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import Button from '@/shared/ui/button/button';

describe('Button', () => {
  test('renders with correct text', () => {
    const mockData = {
      text: 'Test text',
    };
    const { rerender } = render(<Button {...mockData} />);

    expect(screen.getByText(mockData.text)).toBeInTheDocument();

    rerender(<Button text={'search'} />);

    expect(screen.getByRole('button', { name: 'search' })).toBeInTheDocument();
  });

  test('click handler called', async () => {
    const mockHandlerClick = vi.fn();

    render(<Button callback={mockHandlerClick} text={'Click me'} />);

    const button = screen.getByRole('button', { name: 'Click me' });

    await userEvent.click(button);
    expect(mockHandlerClick).toHaveBeenCalled();
  });
});
