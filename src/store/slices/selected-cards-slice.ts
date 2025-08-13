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

const SelectedCardsSlice = createSlice({
  name: 'selectedCard',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<Card>) {
      const card: Card = action.payload;

      if (state.cards.find((el) => el.uid === card.uid)) return;

      state.cards.push(action.payload);
    },
    deleteCard(state, action: PayloadAction<Card>) {
      const card: Card = action.payload;

      const existingCard = state.cards.find((el) => el.uid === card.uid);

      if (!existingCard) return;

      state.cards = state.cards.filter((el) => el.uid !== card.uid);
    },
    deleteAllCards(state) {
      state.cards = [];
    },
  },
});

export const { addCard, deleteCard, deleteAllCards } =
  SelectedCardsSlice.actions;

export default SelectedCardsSlice.reducer;
