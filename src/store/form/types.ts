import { PayloadAction } from "@reduxjs/toolkit";
import { MeterReadings } from "../payment/paymentReducer.utils";

export type InputField = {
  value: number | string;
  error: string | null;
};
export type PriceFieldName = keyof MeterReadings;
export type MonthAndYearFieldName = "year" | "month";
export type PhysicalMeterName = Exclude<PriceFieldName, "waterWaste">;
export type InputFieldName = PriceFieldName | MonthAndYearFieldName;
export type InputFields = { [key in InputFieldName]: InputField };

export type SetterNames =
  | "setMetersInputField"
  | "setPriceInputField"
  | "setMonthAndYearInputFields";

export interface WithInputField<N> {
  inputField: InputField;
  name: N;
}

export type Setter<S, N> = (
  state: S,
  action: PayloadAction<WithInputField<N>>
) => void;

export type FormInputData<T extends { createMode: boolean }> = Omit<
  T,
  "createMode"
>;
