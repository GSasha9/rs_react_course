import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { SelectedItem } from '@/pages/search-page/detailed/models/interfaces';
import type { ComicsRequestResults } from '@/shared/models/interfaces';

interface SearchArgs {
  query: string;
  pageNumber: number;
}

export const baseURL = 'https://stapi.co/api/v1/rest/comics';

export const comicsApi = createApi({
  reducerPath: 'comicsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ['Comic'],
  endpoints: (builder) => ({
    getCardsByQueryAndPage: builder.query<ComicsRequestResults, SearchArgs>({
      query: ({ query, pageNumber }) => {
        if (!query) {
          return { url: `/search?pageNumber=${pageNumber}`, method: 'GET' };
        }

        return {
          url: `/search?title=${query}&name=${query}`,
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
      providesTags: (_result, _error, { query, pageNumber }) => {
        return [{ type: 'Comic', id: `${query || 'all'}-${pageNumber}` }];
      },
    }),
    fetchDataByUid: builder.query<Record<string, SelectedItem>, string>({
      query: (uid: string) => {
        return { url: `?uid=${uid}` };
      },
      providesTags: (_result, _error, uid) => [{ type: 'Comic', id: uid }],
    }),
  }),
});

export const { useGetCardsByQueryAndPageQuery, useFetchDataByUidQuery } =
  comicsApi;
