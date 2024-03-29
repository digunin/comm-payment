import { PayloadAction } from "@reduxjs/toolkit";
import { InputField, Setter, WithInputField } from "../types";

type MonthAndYearFormState = {
  month: InputField;
  year: InputField;
};

export interface MonthAndYearPayload extends WithInputField {
  name: keyof MonthAndYearFormState;
}

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

const setter: Setter<
  { monthAndYearInputFields: MonthAndYearFormState },
  MonthAndYearPayload
> = (state, action) => {
  state.monthAndYearInputFields[action.payload.name] =
    action.payload.inputField;
};

export default {
  initialState,
  setter,
};
