import { createSlice } from '@reduxjs/toolkit';

export interface SelectedCards {
  cardUID: string[];
}

const initialState: SelectedCards = {
  cardUID: [],
};

const SelectedCardSlice = createSlice({
  name: 'selectedCard',
  initialState,
  reducers: {},
});

export default SelectedCardSlice.reducer;
