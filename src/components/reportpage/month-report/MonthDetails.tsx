import React from "react";
import { Months, Payment } from "../../../store/payment/paymentReducer.utils";
import PaymentDetails from "./PaymentDetails";
import { useMonthDetails } from "../reportPageHooks/useMonthDetails";

const MonthReport = () => {
  const {
    payments,
    selectedMonth,
    selectedYear,
    showPaymentsDisabled,
    onEditButtonClick,
    onShowAllPaymentsClick,
  } = useMonthDetails();

  return (
    <>
      <div className="details month-details">
        <div className="month-details-header">
          <p>{`${Months[selectedMonth]} ${selectedYear} details`}</p>
          <button
            className="action-button edit-month-report"
            onClick={onEditButtonClick}
          >
            &#10000;
          </button>
          <button
            onClick={onShowAllPaymentsClick}
            className="action-button show-all-payments"
            disabled={showPaymentsDisabled}
          >
            •••
          </button>
        </div>
        {payments.map((payment) => (
          <PaymentDetails payment={payment as Payment} />
        ))}
      </div>
    </>
  );
};

export default MonthReport;
