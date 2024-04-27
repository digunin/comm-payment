import { PartialData, PartialState, PriceFieldName } from "../types";

const initialState: PartialState<PriceFieldName> = {
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

const partialData: PartialData<"price"> = {
  initialState: {
    priceInputFields: initialState,
  },
  setter: {
    setPriceInputField: (state, action) => {
      state.priceInputFields[action.payload.name] = action.payload.inputField;
    },
  },
};

export default partialData;
