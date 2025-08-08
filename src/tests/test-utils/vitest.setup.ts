import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { server } from '../test-utils/mocks/setup-server';

import '@testing-library/jest-dom';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.resetAllMocks();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
