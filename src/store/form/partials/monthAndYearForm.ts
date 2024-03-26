import { PayloadAction } from "@reduxjs/toolkit";
import { InputField } from "../types";

type MonthAndYearFormState = {
  month: InputField;
  year: InputField;
};

export type MonthAndYearPayload = {
  name: keyof MonthAndYearFormState;
  inputField: InputField;
};

const initialState = {
  month: {
    value: -1,
    error: null,
  },
  year: {
    value: -1,
    error: null,
  },
};

const setter = <T extends { monthAndYearInputFields: MonthAndYearFormState }>(
  state: T,
  action: PayloadAction<MonthAndYearPayload>
) => {
  state.monthAndYearInputFields[action.payload.name] =
    action.payload.inputField;
};

export default {
  initialState,
  setter,
};
