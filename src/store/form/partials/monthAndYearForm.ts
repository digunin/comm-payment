import { PayloadAction } from "@reduxjs/toolkit";
import {
  InputField,
  MonthAndYearFieldName,
  Setter,
  WithInputField,
} from "../types";

type MonthAndYearFormState = {
  [key in MonthAndYearFieldName]: InputField;
};

const initialState: MonthAndYearFormState = {
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
  MonthAndYearFieldName
> = (state, action) => {
  state.monthAndYearInputFields[action.payload.name] =
    action.payload.inputField;
};

export default {
  initialState,
  setter,
};
