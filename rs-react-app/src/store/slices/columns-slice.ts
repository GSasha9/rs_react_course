import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Columns {
  name: string[];
}

const initialState: Columns = {
  name: [],
};

const ColumnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    handleColumns(state, action: PayloadAction<string>) {
      const name = action.payload;

      if (state.name.find((el) => el === name)) {
        const newState = state.name.filter((el) => el !== name);

        state.name = newState;
      } else {
        state.name.push(name);
      }
    },
  },
});

export const { handleColumns } = ColumnsSlice.actions;

export default ColumnsSlice.reducer;
