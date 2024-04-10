import { PayloadAction } from "@reduxjs/toolkit";
import { InputField, SetterNames, WithInputField } from "./types";

export const createForm = <S>(
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
      setInitialValues: (state: S, action: PayloadAction<S>) => {
        return action.payload;
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
