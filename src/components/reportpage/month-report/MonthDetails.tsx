import React from "react";
import { Months, Payment } from "../../../store/payment/types";
import PaymentDetails from "./PaymentDetails";
import { useMonthDetails } from "../../../hooks/report-page/useMonthDetails";
import CompareBar from "./CompareBar";

const MonthDetails = () => {
  const {
    payments,
    selectedMonth,
    selectedYear,
    showPaymentsDisabled,
    selectedPaymentDate,
    totalValueDiff,
    isCompareBarShow,
    onEditButtonClick,
    onShowAllPaymentsClick,
    onPaymentClick,
  } = useMonthDetails();

  return (
    <>
      <div className="details month-details">
        <div className="month-details-header">
          <p>{`${Months[selectedMonth]} ${selectedYear} details`}</p>
          <button
            className="button action-button edit-month-report"
            onClick={onEditButtonClick}
            title="Редактировать запись"
          >
            &#10000;
          </button>
          <button
            onClick={onShowAllPaymentsClick}
            className="button action-button show-all-payments"
            disabled={showPaymentsDisabled}
            title="Все платежи за месяц"
          >
            •••
          </button>
        </div>
        {payments.map((payment) => {
          const selected = selectedPaymentDate === payment.date;
          return (
            <PaymentDetails
              key={payment.date}
              onclick={onPaymentClick}
              payment={payment as Payment}
              selected={selected}
            />
          );
        })}
        {isCompareBarShow && <CompareBar diff={totalValueDiff} />}
      </div>
    </>
  );
};

export default MonthDetails;
