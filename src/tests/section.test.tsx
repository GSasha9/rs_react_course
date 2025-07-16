import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Section from '@/shared/ui/section/section';

describe('Section renders correctly', () => {
  test('Section renders without crashing', () => {
    render(<Section>Text content</Section>);
  });

  test('Section renders children correctly', () => {
    render(<Section>Text content</Section>);

    expect(screen.getByText('Text content')).not.toBeNull();
  });

  test('Section renders as a <section> element', () => {
    const { container } = render(<Section>Text content</Section>);

    const section = container.querySelector('section');

    expect(section).not.toBeNull();
  });
});
