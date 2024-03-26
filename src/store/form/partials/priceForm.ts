import { PayloadAction } from "@reduxjs/toolkit";
import { InputField, InputFieldName } from "../types";

type PriceFormState = {
  [key in InputFieldName]: InputField;
};

export type PriceFormPayload = {
  name: InputFieldName;
  inputField: InputField;
};

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
const setter = <T extends { priceInputFields: PriceFormState }>(
  state: T,
  action: PayloadAction<PriceFormPayload>
) => {
  state.priceInputFields[action.payload.name] = action.payload.inputField;
};

export default {
  initialState,
  setter,
};
