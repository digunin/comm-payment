import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MeterReadings } from "../payment/paymentReducer.utils";
import { RootState } from "..";

type inputField = {
  value: number | string;
  error: string | null;
};

export type PhysicalMeters = Exclude<keyof MeterReadings, "waterWaste">;

type InputFields = {
  [key in PhysicalMeters]: inputField;
};

type CreateMonthReportState = {
  createMode: boolean;
  inputFields: InputFields;
};

const initialState: CreateMonthReportState = {
  createMode: false,
  inputFields: {
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
    setInputField: (
      state,
      action: PayloadAction<{
        name: PhysicalMeters;
        inputField: Partial<inputField>;
      }>
    ) => {
      state.inputFields[action.payload.name] = {
        ...state.inputFields[action.payload.name],
        ...action.payload.inputField,
      };
    },
    setAllFields: (state, action: PayloadAction<InputFields>) => {
      state.inputFields = action.payload;
    },
  },
});

export const selectIsValidForm = (state: RootState) => {
  const fields: InputFields = state.createMonthReportReducer.inputFields;
  for (const key of Object.keys(fields)) {
    if (fields[key as PhysicalMeters].error) return false;
  }
  return true;
};

export const { setCreateMode, toggleCreateMode, setInputField, setAllFields } =
  CreateMonthReportSlice.actions;

export default CreateMonthReportSlice.reducer;
