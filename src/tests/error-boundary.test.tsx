import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { mockThrowingSection } from './test-utils/mocks';

import SearchPage from '@/pages/search-page/search-page';
import ErrorBoundary from '@/shared/ui/error-boundary/error-boundary';

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.resetModules();
  });
  test('renders correctly whith default fallback', async () => {
    const Section = await mockThrowingSection();

    render(
      <ErrorBoundary>
        <Section />
      </ErrorBoundary>
    );

    expect(screen.getByText('mock error')).toBeDefined();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeDefined();
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

  test('shows fallback UI after triggering error', async () => {
    render(<SearchPage />);

    const errorButton = screen.getByRole('button', {
      name: 'throw Page Error',
    });

    await userEvent.click(errorButton);

    expect(await screen.findByText(/Page error/i)).toBeDefined();
  });
});
