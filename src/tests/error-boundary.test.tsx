import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import ErrorBoundary from '@/shared/ui/error-boundary/error-boundary';

vi.mock('@/shared/ui/section/section', () => {
  return {
    default: () => {
      throw new Error('mock error');
    },
  };
});

import Section from '@/shared/ui/section/section';

describe('ErrorBoundray', () => {
  test('renders correctly', () => {
    render(
      <ErrorBoundary>
        <Section />
      </ErrorBoundary>
    );

    expect(screen.getByText('mock error')).toBeDefined();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeDefined();
  });

  test('fallbck closes correctly', async () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        ...window.location,
        reload: vi.fn(),
      },
    });

    render(
      <ErrorBoundary>
        <Section />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /cancel/i });

    await userEvent.click(button);
    expect(window.location.reload).toBeCalled();
  });
});
