import { MonthReport } from "./../../../store/payment/paymentReducer.utils";
import { useSelected } from "./useSelected";
import { createFormInitialValue } from "../../../utils";
import {
  MeterReadings,
  Months,
  Payment,
} from "../../../store/payment/paymentReducer.utils";
import { Price } from "../../../store/price/priceReducer";
import { setInitialValues } from "../../../store/form/createMonthReportReducer";
import {
  setSelectedPayment,
  toggleAllPaymentsShow,
} from "../../../store/payment/paymentReducer";
import { useAppDispatch } from "../../../AppHooks";
import { useNavigate } from "react-router-dom";
import { pathNames } from "../../../route-paths";

export const useMonthDetails = () => {
  const dispatch = useAppDispatch();
  const { selectedMonth, selectedYear, selectedReport } = useSelected();
  const navigate = useNavigate();
  const showPaymentsDisabled = selectedReport?.previousPayments.length === 0;
  const initialValue = createFormInitialValue(
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
      ? (selectedReport as MonthReport).lastPayment.payAmount.total -
        (selectedReport as MonthReport).previousPayments
          .filter((payment) => payment.date === selectedReport?.selected)
          .reduce((payment) => payment).payAmount.total
      : 0;

  const isCompareBarShow = selectedReport?.showAllPayments;

  const onEditButtonClick = () => {
    dispatch(setInitialValues(initialValue));
    navigate(pathNames.edit);
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
