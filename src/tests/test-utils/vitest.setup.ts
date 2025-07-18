import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.resetAllMocks();
});
