import { PayloadAction } from "@reduxjs/toolkit";
import { MeterReadings } from "../payment/paymentReducer.utils";

export type InputField = {
  value: number | string;
  error: string | null;
};
export type InputFieldName = keyof MeterReadings;
export type PhysicalMeterName = Exclude<InputFieldName, "waterWaste">;
export type InputFields = { [key in InputFieldName]: InputField };

export type SetterNames =
  | "setMetersInputField"
  | "setPriceInputField"
  | "setMonthAndYearInputFields";

export interface WithInputField {
  inputField: InputField;
  name: any;
}

export type Setter<S, P extends WithInputField> = (
  state: S,
  action: PayloadAction<P>
) => void;

export type FormInputData<T extends { createMode: boolean }> = Omit<
  T,
  "createMode"
>;
