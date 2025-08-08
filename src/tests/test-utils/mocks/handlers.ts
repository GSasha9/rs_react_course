import { http, HttpResponse } from 'msw';

import { mockResponse } from './mock-response';

const BASE_URL = 'https://stapi.co/api/v1/rest/comics';

export const handlers = [
  http.get(`${BASE_URL}/search`, async ({ request }) => {
    const url = new URL(request.url);
    const pageNumber = url.searchParams.get('pageNumber');

    if (pageNumber === '1') {
      await new Promise((r) => setTimeout(r, 300));

      return HttpResponse.json(mockResponse);
    }

    return HttpResponse.json({
      page: { totalPages: 1 },
      comics: [],
    });
  }),

  http.post(`${BASE_URL}/search`, async ({ request }) => {
    const bodyText = await request.text();
    const params = new URLSearchParams(bodyText);
    const query = params.get('title');

    if (query?.toLowerCase() === 'star') {
      return HttpResponse.json({
        page: { totalPages: 3 },
        comics: [
          { uid: '1', title: 'Mock Comic Star 1' },
          { uid: '2', title: 'Mock Comic Star 2' },
        ],
      });
    }

    return HttpResponse.json({
      page: { totalPages: 1 },
      comics: [],
    });
  }),

  http.get(`${BASE_URL}`, async ({ request }) => {
    const url = new URL(request.url);
    const uid = url.searchParams.get('uid');

    if (uid === 'CCMA0000189821') {
      await new Promise((r) => setTimeout(r, 300));

      return HttpResponse.json({
        comics: {
          uid,
          title: `Mock Comic with UID ${uid}`,
          description: 'Some description',
        },
      });
    }

    return HttpResponse.json({
      comics: null,
    });
  }),
];
