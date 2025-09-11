import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { CountryEntry } from '../shared/types/country-entry';
import type { JsonType } from '../shared/types/json-type';

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getCountriesByYear: builder.query<CountryEntry[], number | void>({
      query: () => 'owid-co2-data.json',
      transformResponse: (data: Record<string, JsonType>, meta, arg) => {
        const year = arg;

        return Object.entries(data)
          .map(([country, obj]) => {
            const jsonData = obj as JsonType;
            const jsonCountryData = jsonData.data;
            let requestedYear;

            if (!year) {
              requestedYear = jsonCountryData[jsonCountryData.length - 1];
            } else {
              requestedYear = jsonCountryData.find((el) => el.year === year);
            }

            if (!requestedYear) return null;

            return {
              country,
              isoCode: jsonData.iso_code,
              requestedYear,
            };
          })
          .filter((entry): entry is CountryEntry => entry !== null);
      },
    }),
  }),
});

export const { useGetCountriesByYearQuery } = countriesApi;
