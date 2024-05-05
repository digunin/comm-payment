import React from "react";
import { selectIsValidForm } from "../../../store/form/createMonthReportReducer";
import MeterReadingsForm from "../MeterReadingsForm";
import SubmitBlock from "../SubmitBlock";
import PriceForm from "../PriceForm";
import MonthAndYearForm from "../MonthAndYearForm";
import { addNewRecord } from "../../../store/payment/paymentReducer";
import { useFormPayload } from "../useFormPayload";
import { setPrice } from "../../../store/price/priceReducer";
import { setMode, setNeedSaving } from "../../../store/app-mode/appModeReducer";
import { setPriceInputField } from "../../../store/form/createMonthReportReducer";
import { setMetersInputField } from "../../../store/form/createMonthReportReducer";
import { setMonthAndYearInputField } from "../../../store/form/createMonthReportReducer";
import { useAppDispatch, useAppSelector } from "../../../AppHooks";

const CreateMonthReport = () => {
  const dispatch = useAppDispatch();
  const isValidForm = useAppSelector(selectIsValidForm);
  const payload = useFormPayload();

  const onSubmit = () => {
    if (!isValidForm) return;
    dispatch(addNewRecord(payload));
    dispatch(setPrice(payload.price));
    dispatch(setMode("show-report"));
    dispatch(setNeedSaving(true));
  };

  return (
    <div className="create-month-report">
      <h1>Добавить новую запись</h1>
      <MonthAndYearForm reducer={setMonthAndYearInputField} />
      <MeterReadingsForm reducer={setMetersInputField} />
      <PriceForm reducer={setPriceInputField} />
      <SubmitBlock
        isValidForm={isValidForm}
        onSubmit={onSubmit}
        onCancel={() => dispatch(setMode("show-report"))}
      />
    </div>
  );
};

export default CreateMonthReport;
