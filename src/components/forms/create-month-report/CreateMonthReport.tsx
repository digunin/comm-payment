import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsValidForm } from "../../../store/form/createMonthReportReducer";
import MeterReadingsForm from "./MeterReadingsForm";
import SubmitBlock from "./SubmitBlock";
import PriceForm from "./PriceForm";
import MonthAndYearForm from "./MonthAndYearForm";
import { addNewRecord } from "../../../store/payment/paymentReducer";
import { useFormPayload } from "../useFormPayload";
import { setPrice } from "../../../store/price/priceReducer";
import { setMode } from "../../../store/app-mode/appModeReducer";

const CreateMonthReport = () => {
  const dispatch = useDispatch();
  const isValidForm = useSelector(selectIsValidForm);
  const payload = useFormPayload();

  const onSubmit = () => {
    if (!isValidForm) return;
    dispatch(addNewRecord(payload));
    dispatch(setPrice(payload.price));
    dispatch(setMode("show-report"));
  };

  return (
    <div className="create-month-report">
      <h1>Добавить новую запись</h1>
      <MonthAndYearForm />
      <MeterReadingsForm />
      <PriceForm />
      <SubmitBlock
        isValidForm={isValidForm}
        onSubmit={onSubmit}
        onCancel={() => dispatch(setMode("show-report"))}
      />
    </div>
  );
};

export default CreateMonthReport;
