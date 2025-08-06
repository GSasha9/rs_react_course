import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { RequestResults } from '@/shared/models/interfaces';

interface SearchArgs {
  query: string;
  pageNumber: number;
}

export const comicsApi = createApi({
  reducerPath: 'comicsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v1/rest/comics' }),
  endpoints: (builder) => ({
    getCardsByQueryAndPage: builder.query<RequestResults, SearchArgs>({
      query: ({ query, pageNumber }) => {
        if (!query || query === '') {
          return { url: `/search?pageNumber=${pageNumber}`, method: 'GET' };
        }

        return {
          url: `/search?pageNumber=${pageNumber}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            title: query,
            name: query,
          }).toString(),
        };
      },
    }),
    fetchDataByUid: builder.query({
      query: (uid: string) => {
        return { url: `?uid=${uid}` };
      },
    }),
  }),
});

export const { useGetCardsByQueryAndPageQuery, useFetchDataByUidQuery } =
  comicsApi;
