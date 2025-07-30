import { expect, test, vi } from 'vitest';

import { startSearch } from './start-search';

import comicsService from '@/services/api/comics-api';
import { mockResponse } from '@/tests/test-utils/mocks';

test('Search triggers API whit right data', () => {
  const mockFetchData = vi
    .spyOn(comicsService, 'fetchData')
    .mockResolvedValue(mockResponse);

  startSearch('text', 0);

  expect(mockFetchData).toBeCalled();
});
