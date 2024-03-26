import { PayloadAction } from "@reduxjs/toolkit";
import { PhysicalMeterName, InputField, InputFields } from "./../types";

type MetersFormState = {
  [key in PhysicalMeterName]: InputField;
};

export type MetersFormPayload = {
  name: PhysicalMeterName;
  inputField: InputField;
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

const setter = <T extends { metersInputFields: MetersFormState }>(
  state: T,
  action: PayloadAction<MetersFormPayload>
) => {
  state.metersInputFields[action.payload.name] = action.payload.inputField;
};

export default {
  initialState,
  setter,
};
