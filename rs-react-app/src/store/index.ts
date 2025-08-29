import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import ColumnsReducer from './slices/columns-slice';
export const setupStore = () => {
  const store = configureStore({
    reducer: { columns: ColumnsReducer },
  });

  setupListeners(store.dispatch);

  return store;
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = ReturnType<AppStore['dispatch']>;
