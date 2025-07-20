import { expect, test, vi } from 'vitest';

import { mockResponse } from '../../../tests/test-utils/mocks';

import { startSearch } from '@/features/search/utils';
import api from '@/shared/api/api.ts';

test('Search triggers API whit right data', () => {
  const mockFetchData = vi
    .spyOn(api, 'fetchData')
    .mockResolvedValue(mockResponse);

  startSearch('api', 'text');

  expect(mockFetchData).toBeCalled();
});
