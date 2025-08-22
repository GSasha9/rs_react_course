import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '..';

export const selectFormData = (state: RootState) => state.formData;

export const getUncontrolledFormData = createSelector(
  [selectFormData],
  (formData) => formData
);
