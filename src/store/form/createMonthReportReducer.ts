import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import pricePartial from "./partials/pricePartial";
import metersPartial from "./partials/metersPartial";
import monthAndYearPartial from "./partials/monthAndYearPartial";
import { createFormPattern, isFormValid } from "./formPattern";

const initialState = {
  ...metersPartial.initialState,
  ...pricePartial.initialState,
  ...monthAndYearPartial.initialState,
};

const pattern = createFormPattern("form/createMonthReport", initialState);

const CreateMonthReportSlice = createSlice({
  ...pattern,
  reducers: {
    ...pattern.reducers,
    ...metersPartial.setter,
    ...pricePartial.setter,
    ...monthAndYearPartial.setter,
  },
});

export const selectIsValidForm = (state: RootState) =>
  isFormValid(state.createMonthReportState);

export const {
  setMetersInputField,
  setPriceInputField,
  setMonthAndYearInputField,
  setInitialValues,
} = CreateMonthReportSlice.actions;

export default CreateMonthReportSlice.reducer;
