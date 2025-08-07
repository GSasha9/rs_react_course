import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { comicsApi } from './api/comics-api';
import SelectedCardsReducer from './slices/selected-cards-slice';

export const appStore = configureStore({
  reducer: {
    [comicsApi.reducerPath]: comicsApi.reducer,
    selectedCard: SelectedCardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(comicsApi.middleware),
});

setupListeners(appStore.dispatch);
export type AppType = typeof appStore;

export type AppDispatch = typeof appStore.dispatch;

export type RootState = ReturnType<typeof appStore.getState>;
