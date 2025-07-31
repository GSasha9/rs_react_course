import { configureStore } from '@reduxjs/toolkit';

import SelectedCardsReducer from '../features/selected-cards/selected-card-slice';

export const store = configureStore({
  reducer: {
    selectedCardsCount: SelectedCardsReducer,
  },
});

export type AppType = typeof store;

export type AppDispatch = typeof store.dispatch;

export type RootSate = ReturnType<typeof store.getState>;
