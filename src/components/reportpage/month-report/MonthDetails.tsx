import React from "react";
import { useSelected } from "../reportPageHooks/useSelected";
import {
  MeterReadings,
  Months,
  Payment,
} from "../../../store/payment/paymentReducer.utils";
import PaymentDetails from "./PaymentDetails";
import { createInitialValue } from "../../../utils";
import { Price } from "../../../store/price/priceReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { setMode } from "../../../store/app-mode/appModeReducer";
import { setInitialValues } from "../../../store/form/createMonthReportReducer";
import { toggleAllPaymentsShow } from "../../../store/payment/paymentReducer";

const MonthReport = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMonth, selectedYear, selectedReport } = useSelected();
  const showPaymentsDisabled = selectedReport?.previousPayments.length === 0;
  const initialValue = createInitialValue(
    selectedMonth as Months,
    selectedYear as number,
    selectedReport?.lastPayment.price as Price,
    selectedReport?.lastPayment.meterReadings as MeterReadings
  );
  const payments = selectedReport?.showAllPayments
    ? [...selectedReport.previousPayments, selectedReport.lastPayment]
    : [selectedReport?.lastPayment];

  const onEditButtonClick = () => {
    dispatch(setMode("change-month-report"));
    dispatch(setInitialValues(initialValue));
  };

  return (
    <>
      <div className="details month-details">
        <div className="month-details-header">
          <p>{`${Months[selectedMonth as Months]} ${selectedYear} details`}</p>
          <button
            className="action-button edit-month-report"
            onClick={onEditButtonClick}
          >
            &#10000;
          </button>
          <button
            onClick={() =>
              dispatch(
                toggleAllPaymentsShow({
                  month: selectedMonth as Months,
                  year: selectedYear as number,
                })
              )
            }
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
