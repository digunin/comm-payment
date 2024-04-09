import React from "react";
import { useSelected } from "../reportPageHooks/useSelected";
import { Months } from "../../../store/payment/paymentReducer.utils";
import MeterReadingsDetails from "./MeterReadingsDetails";

const MonthReport = () => {
  const { selectedMonth, selectedYear, selectedReport } = useSelected();
  const showPaymentsDisabled = selectedReport?.previousPayments.length === 0;
  return (
    <>
      <div className="details month-details">
        <div className="month-details-header">
          <p>{`${Months[selectedMonth as Months]} ${selectedYear} details`}</p>
          <button className="show-all-payments" disabled={showPaymentsDisabled}>
            All payments
          </button>
        </div>
        <MeterReadingsDetails />
      </div>
    </>
  );
};

export default MonthReport;
