import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface LoadingStatus {
  isLoading: boolean;
}

const initialState: LoadingStatus = {
  isLoading: false,
};

const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    toggleLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleLoadingStatus } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
