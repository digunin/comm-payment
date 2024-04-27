import { PayloadAction } from "@reduxjs/toolkit";
import { PartialState } from "./types";

export const createFormPattern = <S>(name: string, initialState: S) => {
  return {
    name: `form/${name}`,
    initialState,
    reducers: {
      setInitialValues: (state: S, action: PayloadAction<S>) => {
        return action.payload;
      },
    },
  };
};

export const haveError = <T extends PartialState<any>>(
  partOfState: T
): boolean => {
  for (const inputField of Object.values(partOfState)) {
    if (inputField.error) return true;
  }
  return false;
};

export const isFormValid = <T extends { [key: string]: PartialState<any> }>(
  state: T
): boolean => {
  for (const inputFields of Object.values(state)) {
    if (haveError(inputFields)) return false;
  }
  return true;
};
