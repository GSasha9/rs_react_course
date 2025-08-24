import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '..';

export const selectFormData = (state: RootState) => state.formData;

export const getFormData = createSelector(
  [selectFormData],
  (formData) => formData
);
