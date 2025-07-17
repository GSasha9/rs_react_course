import { describe, expect, test, vi } from 'vitest';

import '@testing-library/user-event';
import { API } from '@/shared/api/api';

const mockResponse = {
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

global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => mockResponse,
});

const api = API.getInstance();

describe('API', () => {
  test('Can create only one instance', () => {
    const oneMoreApi = API.getInstance();

    expect(api).toBe(oneMoreApi);
  });

  test('makes correct GET request', async () => {
    const results = await api.fetchData('items');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/items/search')
    );

    expect(results).toEqual(mockResponse);
  });

  test('makes correct POST request', async () => {
    const mockQuery = 'test';

    const results = await api.fetchData('items', mockQuery);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/items'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: expect.stringContaining('title=test'),
      })
    );

    expect(results).toEqual(mockResponse);
  });

  test('fetchData throws error on bad response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'Internal Server Error',
    });

    await expect(api.fetchData('items')).rejects.toThrow(
      'Error 500: Internal Server Error'
    );
  });

  test('fetchData throws unknown error', async () => {
    global.fetch = vi.fn().mockRejectedValue('some non-error value');

    await expect(api.fetchData('items')).rejects.toThrow('Unknown error');
  });
});
