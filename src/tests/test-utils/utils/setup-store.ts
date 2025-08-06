import { configureStore } from '@reduxjs/toolkit';

import selectedCardsReducer from '../../../store/selected-cards/slices/selected-cards-slice';

export const setupStore = () =>
  configureStore({
    reducer: {
      selectedCard: selectedCardsReducer,
    },
  });

export type RootState = ReturnType<ReturnType<typeof setupStore>['getState']>;

export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];
