import { PayloadAction } from "@reduxjs/toolkit";
import { FormInputData, Setter, SetterNames, WithInputField } from "./types";

export const createForm = <S extends { createMode: boolean }>(
  name: string,
  initialState: S,
  setters: {
    [key in SetterNames]: Setter<S, WithInputField>;
  }
) => {
  return {
    name: `form/${name}`,
    initialState,
    reducers: {
      setCreateMode: (state: S, action: PayloadAction<boolean>) => {
        state.createMode = action.payload;
      },
      setInitialValues: (state: S, action: PayloadAction<FormInputData<S>>) => {
        return { createMode: state.createMode, ...action.payload };
      },
      ...setters,
    },
  };
};
