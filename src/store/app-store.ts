import { configureStore } from '@reduxjs/toolkit';

import SelectedCardsReducer from '../features/selected-cards/selected-card-slice';

export const appStore = configureStore({
  reducer: {
    selectedCard: SelectedCardsReducer,
  },
});

export type AppType = typeof appStore;

export type AppDispatch = typeof appStore.dispatch;

export type RootSate = ReturnType<typeof appStore.getState>;
