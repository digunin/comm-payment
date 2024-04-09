import React from "react";
import { useSelected } from "../../reportPageHooks/useSelected";
import {
  MonthReport,
  Months,
} from "../../../../store/payment/paymentReducer.utils";
import MonthSinglePayment from "./MonthSinglePayment";

const MonthAllPayments = () => {
  const { selectedReport, selectedYear, selectedMonth } = useSelected();
  return (
    <div className="all-months-payments">
      <div className="date-of-selected">{`${
        Months[selectedMonth as Months]
      } ${selectedYear}`}</div>
      {(selectedReport as MonthReport).previousPayments.map((payment) => (
        <MonthSinglePayment payment={payment} />
      ))}
    </div>
  );
};

export default MonthAllPayments;
