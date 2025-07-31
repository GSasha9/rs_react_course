import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SelectedCards {
  cardUID: string[];
}

const initialState: SelectedCards = {
  cardUID: [],
};

const SelectedCardSlice = createSlice({
  name: 'selectedCard',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<string>) {
      state.cardUID.push(action.payload);
    },
    deleteCard(state, action: PayloadAction<string>) {
      const uid: string = action.payload;

      const cardIndex = state.cardUID.indexOf(uid);

      if (cardIndex !== -1) {
        state.cardUID.splice(cardIndex, 1);
      }
    },
  },
});

export const { addCard, deleteCard } = SelectedCardSlice.actions;

export default SelectedCardSlice.reducer;
