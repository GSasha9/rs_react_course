import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { mockThrowingSection } from '../../../tests/test-utils/mocks';
import ErrorBoundary from './error-boundary';

describe('ErrorBoundary', () => {
  test('catch error and renders correctly whith default fallback', async () => {
    const Section = await mockThrowingSection();

    render(
      <ErrorBoundary>
        <Section className="section" />
      </ErrorBoundary>
    );

    expect(screen.getByText('mock error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  test('fallback closes correctly', async () => {
    const Section = await mockThrowingSection();

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

  test('renders custom fallback if provided', () => {
    const ProblemChild = () => {
      throw new Error('Test error');
    };

    const CustomFallback = (
      <div data-testid="custom-fallback">Custom fallback</div>
    );

    render(
      <ErrorBoundary fallback={CustomFallback}>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
  });
});
