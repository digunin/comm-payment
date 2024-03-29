import { PayloadAction } from "@reduxjs/toolkit";
import { InputField, InputFieldName, Setter, WithInputField } from "../types";

type PriceFormState = {
  [key in InputFieldName]: InputField;
};

export interface PriceFormPayload extends WithInputField {
  name: InputFieldName;
}

const initialState: PriceFormState = {
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
};
const setter: Setter<{ priceInputFields: PriceFormState }, PriceFormPayload> = (
  state,
  action
) => {
  state.priceInputFields[action.payload.name] = action.payload.inputField;
};

export default {
  initialState,
  setter,
};
