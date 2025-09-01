import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '..';

export const selectCountry = (state: RootState) => state.country;

export const getCountries = createSelector([selectCountry], (countries) => [
  countries,
]);
