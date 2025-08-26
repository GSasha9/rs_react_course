import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { COUNTRIES } from '@/shared/constants/countries';

export interface CountryState {
  countries: string[];
  selectedCountry: string | null;
}

const initialState: CountryState = {
  countries: COUNTRIES,
  selectedCountry: null,
};

const CountrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    addCountry(state, action: PayloadAction<string>) {
      const country: string = action.payload;

      if (state.countries.find((el) => el === country)) return;

      state.countries.push(country);
    },
  },
});

export const { addCountry } = CountrySlice.actions;

export default CountrySlice.reducer;
