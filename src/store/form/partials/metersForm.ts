import { PhysicalMeterName, InputField, PartialData } from "./../types";

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

const partialData: PartialData<{
  metersInputFields: MetersFormState;
}> = {
  initialState,
  setter: (state, action) => {
    state.metersInputFields[action.payload.name] = action.payload.inputField;
  },
};

export default partialData;
