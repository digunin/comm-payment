import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MeterReadings } from "../payment/paymentReducer.utils";
import { RootState } from "..";

export type InputField = {
  value: number | string;
  error: string | null;
};

export type InputFieldName = keyof MeterReadings;
export type PhysicalMeterName = Exclude<InputFieldName, "waterWaste">;

type CreateMonthReportState = {
  createMode: boolean;
  metersInputFields: { [key in PhysicalMeterName]: InputField };
  priceInputFields: { [key in InputFieldName]: InputField };
};

export type MonthReportFormData = Omit<CreateMonthReportState, "createMode">;

const initialState: CreateMonthReportState = {
  createMode: false,
  metersInputFields: {
    cold: {
      value: 0,
      error: null,
    },
    hot: {
      value: 0,
      error: null,
    },
    electricity: {
      value: 0,
      error: null,
    },
  },
  priceInputFields: {
    cold: {
      value: 0,
      error: null,
    },
    hot: {
      value: 0,
      error: null,
    },
    electricity: {
      value: 0,
      error: null,
    },
    waterWaste: {
      value: 0,
      error: null,
    },
  },
};

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
    setMetersInputField: (
      state,
      action: PayloadAction<{
        name: PhysicalMeterName;
        inputField: InputField;
      }>
    ) => {
      state.metersInputFields[action.payload.name] = {
        ...state.metersInputFields[action.payload.name],
        ...action.payload.inputField,
      };
    },
    setPriceInputField: (
      state,
      action: PayloadAction<{
        name: InputFieldName;
        inputField: InputField;
      }>
    ) => {
      state.priceInputFields[action.payload.name] = {
        ...state.priceInputFields[action.payload.name],
        ...action.payload.inputField,
      };
    },
    setInitialValues: (state, action: PayloadAction<MonthReportFormData>) => {
      return { createMode: state.createMode, ...action.payload };
    },
  },
});

export const selectIsValidForm = (state: RootState) => {
  const meterFields = state.createMonthReportReducer.metersInputFields;
  for (const key of Object.keys(meterFields)) {
    if (meterFields[key as PhysicalMeterName].error) return false;
  }
  const priceFields = state.createMonthReportReducer.priceInputFields;
  for (const key of Object(priceFields)) {
    if (priceFields[key as InputFieldName].error) return false;
  }
  return true;
};

export const {
  setCreateMode,
  toggleCreateMode,
  setMetersInputField,
  setInitialValues,
} = CreateMonthReportSlice.actions;

export default CreateMonthReportSlice.reducer;
