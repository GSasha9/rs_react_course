import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TileProps } from '@/components/tile/tile';
import { INITIAL_FORM_DATA } from '@/shared/constants/initial-form-data';

export interface FormData {
  uncontrolledForm: TileProps | null;
  hookForm: TileProps | null;
}

const initialState: FormData = {
  uncontrolledForm: INITIAL_FORM_DATA,
  hookForm: INITIAL_FORM_DATA,
};

const FormDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addFormUncontrolledData(state, action: PayloadAction<TileProps>) {
      const data: TileProps = action.payload;

      state.uncontrolledForm = data;
    },
    addHookFormData(state, action: PayloadAction<TileProps>) {
      const data: TileProps = action.payload;

      state.hookForm = data;
    },
  },
});

export const { addFormUncontrolledData, addHookFormData } =
  FormDataSlice.actions;

export default FormDataSlice.reducer;
