import { PayloadAction } from "@reduxjs/toolkit";
import {
  PhysicalMeterName,
  InputField,
  WithInputField,
  Setter,
} from "./../types";

type MetersFormState = {
  [key in PhysicalMeterName]: InputField;
};

export interface MetersFormPayload extends WithInputField {
  name: PhysicalMeterName;
}

const initialState: MetersFormState = {
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
};

const setter: Setter<
  { metersInputFields: MetersFormState },
  MetersFormPayload
> = (state, action) => {
  state.metersInputFields[action.payload.name] = action.payload.inputField;
};

export default {
  initialState,
  setter,
};
