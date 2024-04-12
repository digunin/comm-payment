import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsValidForm } from "../../../store/form/createMonthReportReducer";
import MeterReadingsForm from "../MeterReadingsForm";
import SubmitBlock from "../SubmitBlock";
import PriceForm from "../PriceForm";
import { useFormPayload } from "../useFormPayload";
import { setPrice } from "../../../store/price/priceReducer";
import { setMode } from "../../../store/app-mode/appModeReducer";
import { setPriceInputField } from "../../../store/form/createMonthReportReducer";
import { setMetersInputField } from "../../../store/form/createMonthReportReducer";
import { useSelected } from "../../reportpage/reportPageHooks/useSelected";
import { useLastRecord } from "../useLastRecord";
import { Months } from "../../../store/payment/paymentReducer.utils";
import { recalcPayment } from "../../../store/payment/paymentReducer";

const EditMonthReport = () => {
  const dispatch = useDispatch();
  const isValidForm = useSelector(selectIsValidForm);
  const payload = useFormPayload();

  const { selectedMonth, selectedYear } = useSelected();
  const { latestMonth, latestYear } = useLastRecord();
  const isPossibleChangeReadings =
    selectedYear === latestYear && selectedMonth === latestMonth;

  const onSubmit = () => {
    if (!isValidForm) return;
    dispatch(recalcPayment(payload));
    dispatch(setPrice(payload.price));
    dispatch(setMode("show-report"));
  };

  return (
    <div className="change-month-report">
      <h1>Изменение записи</h1>
      <h2>{`${Months[selectedMonth as Months]} ${selectedYear}`}</h2>
      {isPossibleChangeReadings && (
        <MeterReadingsForm reducer={setMetersInputField} />
      )}
      <PriceForm reducer={setPriceInputField} />
      <SubmitBlock
        isValidForm={isValidForm}
        onSubmit={onSubmit}
        onCancel={() => dispatch(setMode("show-report"))}
      />
    </div>
  );
};

export default EditMonthReport;
