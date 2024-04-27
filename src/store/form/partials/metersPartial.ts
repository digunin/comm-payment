import { PhysicalMeterName, PartialData, PartialState } from "../types";

const initialState: PartialState<PhysicalMeterName> = {
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

const partialData: PartialData<"meters"> = {
  initialState: {
    metersInputFields: initialState,
  },
  setter: {
    setMetersInputField: (state, action) => {
      state.metersInputFields[action.payload.name] = action.payload.inputField;
    },
  },
};

export default partialData;
