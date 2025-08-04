import { configureStore } from '@reduxjs/toolkit';

import selectedCardsReducer from '../../../store/features/selected-cards/slices/selected-card-slice';

export const setupStore = () =>
  configureStore({
    reducer: {
      selectedCard: selectedCardsReducer,
    },
  });

export type RootState = ReturnType<ReturnType<typeof setupStore>['getState']>;

export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];
