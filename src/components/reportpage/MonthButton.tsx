import React from "react";
import { Months } from "../../store/payment/types";

type MBProps = {
  month: Months;
  selected?: boolean;
  disabled?: boolean;
  onclick?: (month: number) => void;
};

const MonthButton = ({
  month,
  selected = false,
  disabled = false,
  onclick = () => {},
}: MBProps) => {
  const classname = disabled
    ? "month-button disabled"
    : `month-button month-${Months[month]}${selected ? " selected" : ""}`;
  return (
    <button
      disabled={disabled}
      onClick={() => onclick(month)}
      className={classname}
    >
      {month + 1}
    </button>
  );
};

export default MonthButton;
