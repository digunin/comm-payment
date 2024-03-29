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
  PhysicalMeterName
> = (state, action) => {
  state.metersInputFields[action.payload.name] = action.payload.inputField;
};

export default {
  initialState,
  setter,
};
