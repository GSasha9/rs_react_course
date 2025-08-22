import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import CountryReducer from './slices/country-slice';
import FormDataReducer from './slices/form-data-slice';

export const setupStore = () => {
  const store = configureStore({
    reducer: {
      formData: FormDataReducer,
      country: CountryReducer,
    },
  });

  setupListeners(store.dispatch);

  return store;
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
