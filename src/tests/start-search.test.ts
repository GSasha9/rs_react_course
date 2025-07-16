import { expect, test, vi } from 'vitest';

import { startSearch } from '@/features/search/utils';
import api from '@/shared/api/api.ts';

const mockResult = {
  page: {
    firstPage: true,
    lastPage: true,
    numberOfElements: 100,
    pageNumber: 0,
    pageSize: 1,
    totalElements: 1000,
    totalPages: 10,
  },
  sort: {
    direction: 'desc',
  },
  array: [1, 2, 3, 4],
};

test('Search triggers API whit right data', () => {
  const mockFetchData = vi
    .spyOn(api, 'fetchData')
    .mockResolvedValue(mockResult);

  startSearch('api', 'text');

  expect(mockFetchData).toBeCalled();
});
