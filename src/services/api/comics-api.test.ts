import { beforeEach, describe, expect, test, vi } from 'vitest';

import { mockResponse } from '../../tests/test-utils/mocks';
import { ComicsApi } from './comics-api';

import '@testing-library/user-event';

let api: ComicsApi;

beforeEach(() => {
  api = new ComicsApi();
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => mockResponse,
  });
});

describe('API', () => {
  test('makes correct GET request and returns successful response', async () => {
    const results = await api.fetchData('', 0);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/search'));

    expect(results).toEqual(mockResponse);
  });

  test('makes correct GET request by uid', async () => {
    const mockUid = 'asd789';
    const results = await api.fetchDataById(mockUid);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`?uid=asd789`));

    expect(results).toEqual(mockResponse);
  });

  test('makes correct POST request and returns successful response', async () => {
    const mockQuery = 'test';

    const results = await api.fetchData(mockQuery, 0);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/search'),
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

    await expect(api.fetchData('', 0)).rejects.toThrow(
      'Error 500: Internal Server Error'
    );
  });

  test('fetchData throws error on bad response by uid', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'Internal Server Error',
    });

    await expect(api.fetchDataById('asd123')).rejects.toThrow(
      'Error 500: Internal Server Error'
    );
  });

  test('fetchData throws unknown error', async () => {
    global.fetch = vi.fn().mockRejectedValue('some non-error value');

    await expect(api.fetchData('', 0)).rejects.toThrow('Unknown error');
  });
});
