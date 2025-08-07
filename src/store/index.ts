import { configureStore } from '@reduxjs/toolkit';

import isLoadingReducer from './slices/is-loading-slice';
import SelectedCardsReducer from './slices/selected-cards-slice';

export const appStore = configureStore({
  reducer: {
    selectedCard: SelectedCardsReducer,
    isLoading: isLoadingReducer,
  },
});

export type AppType = typeof appStore;

export type AppDispatch = typeof appStore.dispatch;

export type RootState = ReturnType<typeof appStore.getState>;
