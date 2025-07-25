import { expect, test, vi } from 'vitest';

import { startSearch } from './start-search';

import api from '@/shared/api/api.ts';
import { mockResponse } from '@/tests/test-utils/mocks';

test('Search triggers API whit right data', () => {
  const mockFetchData = vi
    .spyOn(api, 'fetchData')
    .mockResolvedValue(mockResponse);

  startSearch('api', 'text', 0);

  expect(mockFetchData).toBeCalled();
});
