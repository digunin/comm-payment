import React from "react";
import { Months } from "../../../store/payment/paymentReducer.utils";
import { useDatePicker } from "../useDatePicker";

type DPProps = {
  onchange: (year: number, month: Months) => void;
  minYear: number;
  minMonth: Months;
};

const DatePicker = ({ minYear, minMonth, onchange }: DPProps) => {
  const { minDate, onPickDate } = useDatePicker(minYear, minMonth, onchange);
  return <input type="date" min={minDate} onChange={onPickDate} />;
};

export default DatePicker;
