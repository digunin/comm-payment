import React from "react";
import { Months } from "../../store/payment/types";
import { useDatePicker } from "../../hooks/form/useDatePicker";

type DPProps = {
  onchange: (year: number, month: Months) => void;
  value: string;
  minYear: number;
  minMonth: Months;
};

const DatePicker = ({ minYear, minMonth, value, onchange }: DPProps) => {
  const { minDate, onPickDate } = useDatePicker(minYear, minMonth, onchange);
  return (
    <input
      data-testid="calendar"
      type="date"
      min={minDate}
      value={value}
      onChange={onPickDate}
    />
  );
};

export default DatePicker;
