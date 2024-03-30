import { InputField, PartialData, PriceFieldName } from "../types";

type PriceFormState = {
  [key in PriceFieldName]: InputField;
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

const partialData: PartialData<{
  priceInputFields: PriceFormState;
}> = {
  initialState,
  setter: (state, action) => {
    state.priceInputFields[action.payload.name] = action.payload.inputField;
  },
};

export default partialData;
