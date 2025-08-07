import { configureStore } from '@reduxjs/toolkit';

import isLoadingReducer from '../../../store/slices/is-loading-slice';
import selectedCardsReducer from '../../../store/slices/selected-cards-slice';

export const setupStore = () =>
  configureStore({
    reducer: {
      selectedCard: selectedCardsReducer,
      isLoading: isLoadingReducer,
    },
  });

export type RootState = ReturnType<ReturnType<typeof setupStore>['getState']>;

export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];
