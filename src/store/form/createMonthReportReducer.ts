import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import pricePartial from "./partials/priceForm";
import metersPartial from "./partials/metersForm";
import monthAndYearPartial from "./partials/monthAndYearForm";
import { FormInputData, InputField } from "./types";

// type CreateMonthReportState = {
//   createMode: boolean;
//   metersInputFields: typeof metersPartial.initialState;
//   priceInputFields: typeof pricePartial.initialState;
//   monthAndYearInputFields: typeof monthAndYearPartial.initialState;
// };

const initialState = {
  createMode: false,
  metersInputFields: metersPartial.initialState,
  priceInputFields: pricePartial.initialState,
  monthAndYearInputFields: monthAndYearPartial.initialState,
};

type CreateMonthReportState = typeof initialState;
type CreateMonthReportFormData = FormInputData<CreateMonthReportState>;

const CreateMonthReportSlice = createSlice({
  name: "form/createMonthReport",
  initialState,
  reducers: {
    setCreateMode: (state, action: PayloadAction<boolean>) => {
      state.createMode = action.payload;
    },
    toggleCreateMode: (state) => {
      state.createMode = !state.createMode;
    },
    setMetersInputField: metersPartial.setter,
    setPriceInputField: pricePartial.setter,
    setMonthAndYearInputFields: monthAndYearPartial.setter,
    setInitialValues: (
      state,
      action: PayloadAction<CreateMonthReportFormData>
    ) => {
      return { createMode: state.createMode, ...action.payload };
    },
  },
});

const haveError = <T extends { [key in keyof T]: InputField }>(
  partOfState: T
): boolean => {
  console.log(Object.keys(partOfState));

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
  return isValidForm(<CreateMonthReportFormData>state.createMonthReportState);
};

export const {
  setCreateMode,
  toggleCreateMode,
  setMetersInputField,
  setPriceInputField,
  setMonthAndYearInputFields,
  setInitialValues,
} = CreateMonthReportSlice.actions;

export default CreateMonthReportSlice.reducer;
