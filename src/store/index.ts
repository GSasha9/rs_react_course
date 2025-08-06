import { configureStore } from '@reduxjs/toolkit';

import SelectedCardsReducer from './selected-cards/slices/selected-cards-slice';

export const appStore = configureStore({
  reducer: {
    selectedCard: SelectedCardsReducer,
  },
});

export type AppType = typeof appStore;

export type AppDispatch = typeof appStore.dispatch;

export type RootState = ReturnType<typeof appStore.getState>;
