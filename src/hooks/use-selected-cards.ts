import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';
import { getSelectedCards } from '@/store/selectors/selected-cards-selector';
import type { Card } from '@/store/slices/selected-cards-slice';
import {
  addCard,
  deleteAllCards,
  deleteCard,
} from '@/store/slices/selected-cards-slice';

export const useSelectedCards = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(getSelectedCards);

  return {
    cards,
    addCard: (card: Card) => dispatch(addCard(card)),
    deleteCard: (card: Card) => dispatch(deleteCard(card)),
    deleteAllCards: () => dispatch(deleteAllCards()),
  };
};
