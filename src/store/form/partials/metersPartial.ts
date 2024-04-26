import {
  PhysicalMeterName,
  InputField,
  PartialData,
  PartialState,
} from "../types";

type MetersFormState = PartialState<PhysicalMeterName>;

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
