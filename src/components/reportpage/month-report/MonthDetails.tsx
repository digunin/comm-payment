import React from "react";
import { useSelected } from "../reportPageHooks/useSelected";
import {
  MeterReadings,
  Months,
} from "../../../store/payment/paymentReducer.utils";
import MeterReadingsDetails from "./MeterReadingsDetails";
import { createInitialValue } from "../../../utils";
import { Price } from "../../../store/price/priceReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { setMode } from "../../../store/app-mode/appModeReducer";
import { setInitialValues } from "../../../store/form/createMonthReportReducer";

const MonthReport = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMonth, selectedYear, selectedReport } = useSelected();
  const initialValue = createInitialValue(
    selectedMonth as Months,
    selectedYear as number,
    selectedReport?.lastPayment.price as Price,
    selectedReport?.lastPayment.meterReadings as MeterReadings
  );

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
            Edit
          </button>
        </div>
        <MeterReadingsDetails />
      </div>
    </>
  );
};

export default MonthReport;
