import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/tests/test-utils/utils/setup-store';

export const selectSelectedCards = (state: RootState) =>
  state.selectedCard.cards;

export const getSelectedCards = createSelector(
  [selectSelectedCards],
  (cards) => cards
);
