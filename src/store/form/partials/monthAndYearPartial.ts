import { MonthAndYearFieldName, PartialData, PartialState } from "../types";

const initialState: PartialState<MonthAndYearFieldName> = {
  month: {
    value: -1,
    error: null,
  },
  year: {
    value: -1,
    error: null,
  },
};

const partialData: PartialData<"monthAndYear"> = {
  initialState: {
    monthAndYearInputFields: initialState,
  },
  setter: {
    setMonthAndYearInputField: (state, action) => {
      state.monthAndYearInputFields[action.payload.name] =
        action.payload.inputField;
    },
  },
};

export default partialData;
