import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import SelectedItemReducer from '../store/slices/selected-item-slice';
import { comicsApi } from './api/comics.api';
import SelectedCardsReducer, {
  type SelectedCards,
} from './slices/selected-cards-slice';

export interface RootStateSchema {
  [comicsApi.reducerPath]: ReturnType<typeof comicsApi.reducer>;
  selectedCard: SelectedCards;
}

export const setupStore = () => {
  const store = configureStore({
    reducer: {
      [comicsApi.reducerPath]: comicsApi.reducer,
      selectedCard: SelectedCardsReducer,
      selectedItem: SelectedItemReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(comicsApi.middleware),
  });

  setupListeners(store.dispatch);

  return store;
};

//export const appStore = setupStore();

export type AppStore = ReturnType<typeof setupStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
