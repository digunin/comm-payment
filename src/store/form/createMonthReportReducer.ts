import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import pricePartial from "./partials/pricePartial";
import metersPartial from "./partials/metersPartial";
import monthAndYearPartial from "./partials/monthAndYearPartial";
import { createForm, haveError } from "./formPattern";

const initialState = {
  metersInputFields: metersPartial.initialState,
  priceInputFields: pricePartial.initialState,
  monthAndYearInputFields: monthAndYearPartial.initialState,
};

const CreateMonthReportSlice = createSlice(
  createForm("form/createMonthReport", initialState, {
    setMetersInputField: metersPartial.setter,
    setPriceInputField: pricePartial.setter,
    setMonthAndYearInputFields: monthAndYearPartial.setter,
  })
);

export const selectIsValidForm = (state: RootState) => {
  for (const inputFields of Object.values(state.createMonthReportState)) {
    if (typeof inputFields === "boolean") continue;
    if (haveError(inputFields)) return false;
  }
  return true;
};

export const {
  setMetersInputField,
  setPriceInputField,
  setMonthAndYearInputFields,
  setInitialValues,
} = CreateMonthReportSlice.actions;

export default CreateMonthReportSlice.reducer;
