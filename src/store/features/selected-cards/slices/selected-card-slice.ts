import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Card {
  uid: string;
  title: string;
  description: string;
  url: string;
}

export interface SelectedCards {
  cards: Card[];
}

const initialState: SelectedCards = {
  cards: [],
};

const SelectedCardSlice = createSlice({
  name: 'selectedCard',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<Card>) {
      state.cards.push(action.payload);
    },
    deleteCard(state, action: PayloadAction<Card>) {
      const card: Card = action.payload;

      const savedCard = state.cards.find((el) => el.uid === card.uid);

      if (!savedCard) return;

      const cardIndex = state.cards.indexOf(savedCard);

      if (cardIndex !== -1) {
        state.cards.splice(cardIndex, 1);
      }
    },
    deleteAllCards(state) {
      state.cards.length = 0;
    },
  },
});

export const { addCard, deleteCard, deleteAllCards } =
  SelectedCardSlice.actions;

export default SelectedCardSlice.reducer;
