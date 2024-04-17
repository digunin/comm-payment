import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { useSelected } from "./useSelected";
import { createInitialValue } from "../../../utils";
import {
  MeterReadings,
  Months,
  Payment,
} from "../../../store/payment/paymentReducer.utils";
import { Price } from "../../../store/price/priceReducer";
import { setMode } from "../../../store/app-mode/appModeReducer";
import { setInitialValues } from "../../../store/form/createMonthReportReducer";
import { toggleAllPaymentsShow } from "../../../store/payment/paymentReducer";

export const useMonthDetails = () => {
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

  const onShowAllPaymentsClick = () =>
    dispatch(
      toggleAllPaymentsShow({
        month: selectedMonth as Months,
        year: selectedYear as number,
      })
    );

  return {
    selectedMonth: selectedMonth as Months,
    selectedYear: selectedYear as number,
    onEditButtonClick,
    onShowAllPaymentsClick,
    payments: payments as Array<Payment>,
    showPaymentsDisabled,
  };
};
