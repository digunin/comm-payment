import { MeterReadings, Months } from "../../store/payment/types";
import ruNames from "./ru";

export type Names = {
  meterNames: { [key in keyof MeterReadings]: string };
  monthNames: { [key in Months]: string };
};

export const actualNames = ruNames;
