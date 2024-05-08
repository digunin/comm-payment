import React from "react";
import { useNavigate } from "react-router-dom";
import { selectIsValidForm } from "../../../store/form/createMonthReportReducer";
import MeterReadingsForm from "../MeterReadingsForm";
import SubmitBlock from "../SubmitBlock";
import PriceForm from "../PriceForm";
import MonthAndYearForm from "../MonthAndYearForm";
import { addNewRecord } from "../../../store/payment/paymentReducer";
import { useFormPayload } from "../../../hooks/form/useFormPayload";
import { setPrice } from "../../../store/price/priceReducer";
import { setNeedSaving } from "../../../store/savingStatusReducer";
import { setPriceInputField } from "../../../store/form/createMonthReportReducer";
import { setMetersInputField } from "../../../store/form/createMonthReportReducer";
import { setMonthAndYearInputField } from "../../../store/form/createMonthReportReducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hoks";
import { pathNames } from "../../../utils/values";

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
      <div className="form-header">
        <h1>Добавить новую запись</h1>
      </div>
      <MonthAndYearForm reducer={setMonthAndYearInputField} />
      <MeterReadingsForm reducer={setMetersInputField} />
      <PriceForm reducer={setPriceInputField} />
      <SubmitBlock isValidForm={isValidForm} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateMonthReport;
