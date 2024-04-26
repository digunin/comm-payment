import { PayloadAction } from "@reduxjs/toolkit";
import { MeterReadings } from "../payment/paymentReducer.utils";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

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

export type PartialState<N extends InputFieldName> = {
  [key in N]: InputField;
};
export type InputFields = { [key in InputFieldName]: InputField };

export type SetterNames =
  | "setMetersInputField"
  | "setPriceInputField"
  | "setMonthAndYearInputFields";

export interface WithInputField<N> {
  inputField: InputField;
  name: N;
}

export type FormFieldSetter = ActionCreatorWithPayload<
  WithInputField<InputFieldName>
>;

export type PartialData<S> = S extends { [key: string]: infer R }
  ? {
      initialState: R;
      setter: (
        state: S,
        action: PayloadAction<WithInputField<keyof R>>
      ) => void;
    }
  : never;
