import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface SelectedItemState {
  uid: string;
  page: number;
}

const initialState: SelectedItemState = {
  uid: '',
  page: 1,
};

const SelectedItemSlice = createSlice({
  name: 'selectedItem',
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<SelectedItemState>) {
      state.uid = action.payload.uid;
      state.page = action.payload.page;
    },
    clearItem(state) {
      state.uid = '';
      state.page = 1;
    },
  },
});

export const { selectItem, clearItem } = SelectedItemSlice.actions;

export default SelectedItemSlice.reducer;
