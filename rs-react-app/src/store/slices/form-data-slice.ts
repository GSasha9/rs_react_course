import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { INITIAL_FORM_DATA } from '@/shared/constants/initial-form-data';
import type { FormValues } from '@/shared/types/form-values';

export interface FormData {
  uncontrolledForm: FormValues | null;
  hookForm: FormValues | null;
}

const initialState: FormData = {
  uncontrolledForm: INITIAL_FORM_DATA,
  hookForm: INITIAL_FORM_DATA,
};

const FormDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addFormUncontrolledData(state, action: PayloadAction<FormValues>) {
      const data: FormValues = action.payload;

      state.uncontrolledForm = data;
    },
    addHookFormData(state, action: PayloadAction<FormValues>) {
      const data: FormValues = action.payload;

      state.hookForm = data;
    },
  },
});

export const { addFormUncontrolledData, addHookFormData } =
  FormDataSlice.actions;

export default FormDataSlice.reducer;
