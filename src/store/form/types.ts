import { MeterReadings } from "../payment/paymentReducer.utils";

export type InputField = {
  value: number | string;
  error: string | null;
};
export type InputFieldName = keyof MeterReadings;
export type PhysicalMeterName = Exclude<InputFieldName, "waterWaste">;
export type InputFields = { [key in InputFieldName]: InputField };

export type FormInputData<T extends { createMode: boolean }> = Omit<
  T,
  "createMode"
>;
