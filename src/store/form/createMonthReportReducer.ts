import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import pricePartial from "./partials/priceForm";
import metersPartial from "./partials/metersForm";
import monthAndYearPartial from "./partials/monthAndYearForm";
import { FormInputData, InputField } from "./types";
import { createForm } from "./formPattern";

const initialState = {
  createMode: false,
  metersInputFields: metersPartial.initialState,
  priceInputFields: pricePartial.initialState,
  monthAndYearInputFields: monthAndYearPartial.initialState,
};

type CreateMonthReportState = typeof initialState;
type CreateMonthReportFormData = FormInputData<CreateMonthReportState>;

const CreateMonthReportSlice = createSlice(
  createForm("form/createMonthReport", initialState, {
    setMetersInputField: metersPartial.setter,
    setPriceInputField: pricePartial.setter,
    setMonthAndYearInputFields: monthAndYearPartial.setter,
  })
);

const haveError = <T extends { [key in keyof T]: InputField }>(
  partOfState: T
): boolean => {
  for (const key of Object.keys(partOfState)) {
    if (partOfState[key as keyof T].error) return true;
  }
  return false;
};

const isValidForm = (form: CreateMonthReportFormData): boolean => {
  for (const key of Object.keys(form)) {
    if (key === "createMode") continue;
    if (haveError(form[key as keyof CreateMonthReportFormData])) {
      return false;
    }
  }
  return true;
};

export const selectIsValidForm = (state: RootState) => {
  return isValidForm(state.createMonthReportState);
};

export const {
  setCreateMode,
  setMetersInputField,
  setPriceInputField,
  setMonthAndYearInputFields,
  setInitialValues,
} = CreateMonthReportSlice.actions;

export default CreateMonthReportSlice.reducer;
