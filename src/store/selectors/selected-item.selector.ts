import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '..';

export const selectUid = (state: RootState) => state.selectedItem.uid;

export const selectPage = (state: RootState) => state.selectedItem.page;

export const getSelectedItem = createSelector(
  [selectUid, selectPage],
  (uid, page) => ({ uid, page })
);
