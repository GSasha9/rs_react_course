import type { RootState } from '@/tests/test-utils/utils/setup-store';

export const getSelectedCards = (state: RootState) => state.selectedCard.cards;
