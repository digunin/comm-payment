import { PayloadAction } from "@reduxjs/toolkit";
import { MeterReadings } from "../payment/paymentReducer.utils";

export type InputField = {
  value: number | string;
  error: string | null;
};

export type PriceFieldName = keyof MeterReadings;
export type MonthAndYearFieldName = "year" | "month";
export type PhysicalMeterName = Exclude<PriceFieldName, "waterWaste">;
export type InputFieldName =
  | PriceFieldName
  | MonthAndYearFieldName
  | PhysicalMeterName;

export type PartialName = "price" | "meters" | "monthAndYear";
export type PartialState<N extends InputFieldName> = {
  [key in N]: InputField;
};

type CreatePartialStateName<N> = N extends PartialName
  ? `${N}InputFields`
  : never;

type CreateSetterName<N> = N extends PartialName
  ? `set${Capitalize<N>}InputField`
  : never;

type TypeOfFieldName<N> = N extends "price"
  ? PriceFieldName
  : N extends "meters"
  ? PhysicalMeterName
  : N extends "monthAndYear"
  ? MonthAndYearFieldName
  : never;

export type SetterNames = CreateSetterName<PartialName>;
export type PartialStateName = CreatePartialStateName<PartialName>;

export interface WithInputField<N> {
  inputField: InputField;
  name: N;
}

export type PartialData<N extends PartialName> = {
  initialState: {
    [key in CreatePartialStateName<N>]: PartialState<TypeOfFieldName<N>>;
  };
  setter: {
    [key in CreateSetterName<N>]: (
      state: {
        [key in CreatePartialStateName<N>]: PartialState<TypeOfFieldName<N>>;
      },
      action: PayloadAction<WithInputField<TypeOfFieldName<N>>>
    ) => void;
  };
};
