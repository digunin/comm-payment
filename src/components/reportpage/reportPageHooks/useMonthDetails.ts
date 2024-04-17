import {
  MonthReport,
  fixFractionPart,
} from "./../../../store/payment/paymentReducer.utils";
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
import {
  setSelectedPayment,
  toggleAllPaymentsShow,
} from "../../../store/payment/paymentReducer";

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

  const totalValueDiff =
    (selectedReport as MonthReport).previousPayments.length > 0
      ? fixFractionPart(
          (selectedReport as MonthReport).lastPayment.payAmount.total -
            (selectedReport as MonthReport).previousPayments
              .filter((payment) => payment.date === selectedReport?.selected)
              .reduce((payment) => payment).payAmount.total
        )
      : 0;

  const isCompareBarShow = selectedReport?.showAllPayments;

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

  const onPaymentClick = (date: number) => {
    if (date === selectedReport?.lastPayment.date) return;
    dispatch(
      setSelectedPayment({
        month: selectedMonth as Months,
        year: selectedYear as number,
        date,
      })
    );
  };

  return {
    selectedMonth: selectedMonth as Months,
    selectedYear: selectedYear as number,
    payments: payments as Array<Payment>,
    showPaymentsDisabled,
    selectedPaymentDate: selectedReport?.selected as number,
    totalValueDiff,
    isCompareBarShow,
    onEditButtonClick,
    onShowAllPaymentsClick,
    onPaymentClick,
  };
};
