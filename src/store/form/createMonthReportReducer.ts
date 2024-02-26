import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MeterReadings } from "../payment/paymentReducer.utils";
import { RootState } from "..";

export type inputField = {
  value: number | string;
  error: string | null;
};

export type PhysicalMeters = Exclude<keyof MeterReadings, "waterWaste">;

export type InputFields = {
  [key in PhysicalMeters]: inputField;
};

type CreateMonthReportState = {
  createMode: boolean;
  metersInputFields: InputFields;
  // priceInputFields:
};

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
        name: PhysicalMeters;
        inputField: Partial<inputField>;
      }>
    ) => {
      state.metersInputFields[action.payload.name] = {
        ...state.metersInputFields[action.payload.name],
        ...action.payload.inputField,
      };
    },
    setAllFields: (state, action: PayloadAction<InputFields>) => {
      state.metersInputFields = action.payload;
    },
  },
});

export const selectIsValidForm = (state: RootState) => {
  const fields: InputFields = state.createMonthReportReducer.metersInputFields;
  for (const key of Object.keys(fields)) {
    if (fields[key as PhysicalMeters].error) return false;
  }
  return true;
};

export const {
  setCreateMode,
  toggleCreateMode,
  setMetersInputField,
  setAllFields,
} = CreateMonthReportSlice.actions;

export default CreateMonthReportSlice.reducer;
