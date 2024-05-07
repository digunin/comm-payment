import React from "react";
import { selectIsValidForm } from "../../../store/form/createMonthReportReducer";
import MeterReadingsForm from "../MeterReadingsForm";
import SubmitBlock from "../SubmitBlock";
import PriceForm from "../PriceForm";
import MonthAndYearForm from "../MonthAndYearForm";
import { addNewRecord } from "../../../store/payment/paymentReducer";
import { useFormPayload } from "../useFormPayload";
import { setPrice } from "../../../store/price/priceReducer";
import { setNeedSaving } from "../../../store/savingStatusReducer";
import { setPriceInputField } from "../../../store/form/createMonthReportReducer";
import { setMetersInputField } from "../../../store/form/createMonthReportReducer";
import { setMonthAndYearInputField } from "../../../store/form/createMonthReportReducer";
import { useAppDispatch, useAppSelector } from "../../../AppHooks";
import { useNavigate } from "react-router-dom";
import { pathNames } from "../../../route-paths";

const CreateMonthReport = () => {
  const dispatch = useAppDispatch();
  const isValidForm = useAppSelector(selectIsValidForm);
  const payload = useFormPayload();
  const navigate = useNavigate();

  const onSubmit = () => {
    if (!isValidForm) return;
    dispatch(addNewRecord(payload));
    dispatch(setPrice(payload.price));
    dispatch(setNeedSaving(true));
    navigate(pathNames.home);
  };

  return (
    <div className="create-month-report">
      <h1>Добавить новую запись</h1>
      <MonthAndYearForm reducer={setMonthAndYearInputField} />
      <MeterReadingsForm reducer={setMetersInputField} />
      <PriceForm reducer={setPriceInputField} />
      <SubmitBlock isValidForm={isValidForm} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateMonthReport;
