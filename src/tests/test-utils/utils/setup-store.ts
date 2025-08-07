import { configureStore } from '@reduxjs/toolkit';

import isLoadingReducer from '../../../store/slices/is-loading-slice';
import selectedCardsReducer from '../../../store/slices/selected-cards-slice';

import { comicsApi } from '@/store/api/comics-api';

export const setupStore = () =>
  configureStore({
    reducer: {
      [comicsApi.reducerPath]: comicsApi.reducer,
      selectedCard: selectedCardsReducer,
      isLoading: isLoadingReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(comicsApi.middleware),
  });

//setupListeners(setupStore.dispatch);

export type RootState = ReturnType<ReturnType<typeof setupStore>['getState']>;

export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];
