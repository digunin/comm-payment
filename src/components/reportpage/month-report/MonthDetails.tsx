import React from "react";
import { useSelected } from "../reportPageHooks/useSelected";
import { Months } from "../../../store/payment/paymentReducer.utils";
import MeterReadingsDetails from "./MeterReadingsDetails";

const MonthReport = () => {
  const { selectedMonth, selectedYear } = useSelected();

  return (
    <>
      <div className="details month-details">
        <div className="month-details-header">{`${
          Months[selectedMonth as Months]
        } ${selectedYear} details`}</div>
        <MeterReadingsDetails />
      </div>
    </>
  );
};

export default MonthReport;
