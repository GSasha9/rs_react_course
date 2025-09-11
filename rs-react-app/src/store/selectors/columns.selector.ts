import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '..';

export const selectColumns = (state: RootState) => state.columns;

export const getColumns = createSelector([selectColumns], (columns) => [
  columns,
]);
