import { PayloadAction } from "@reduxjs/toolkit";
import { PhysicalMeterName, InputField, WithInputField } from "./../types";

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
