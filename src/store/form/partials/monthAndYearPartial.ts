import {
  InputField,
  MonthAndYearFieldName,
  PartialData,
  PartialState,
} from "../types";

type MonthAndYearFormState = PartialState<MonthAndYearFieldName>;

const initialState: MonthAndYearFormState = {
  month: {
    value: -1,
    error: null,
  },
  year: {
    value: -1,
    error: null,
  },
};

const partialData: PartialData<{
  monthAndYearInputFields: MonthAndYearFormState;
}> = {
  initialState,
  setter: (state, action) => {
    state.monthAndYearInputFields[action.payload.name] =
      action.payload.inputField;
  },
};

export default partialData;
