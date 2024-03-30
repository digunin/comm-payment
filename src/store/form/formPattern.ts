import { PayloadAction } from "@reduxjs/toolkit";
import {
  FormInputData,
  InputField,
  SetterNames,
  WithInputField,
} from "./types";

export const createForm = <S extends { createMode: boolean }>(
  name: string,
  initialState: S,
  setters: {
    [key in SetterNames]: (
      state: S,
      action: PayloadAction<WithInputField<any>>
    ) => void;
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

export const haveError = <T extends { [key in keyof T]: InputField }>(
  partOfState: T
): boolean => {
  for (const key of Object.keys(partOfState)) {
    if (partOfState[key as keyof T].error) return true;
  }
  return false;
};
