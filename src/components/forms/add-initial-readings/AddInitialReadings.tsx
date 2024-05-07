import React from "react";
import { useAppDispatch, useAppSelector } from "../../../AppHooks";
import {
  selectIsValidForm,
  setMetersInputField,
} from "../../../store/form/createMonthReportReducer";
import { useFormPayload } from "../useFormPayload";
import MeterReadingsForm from "../MeterReadingsForm";
import SubmitBlock from "../SubmitBlock";
import { addStartReadings } from "../../../store/payment/paymentReducer";
import { setNeedSaving } from "../../../store/savingStatusReducer";
import { useNavigate } from "react-router-dom";
import { pathNames } from "../../../route-paths";

const AddInitialReadings = () => {
  const dispatch = useAppDispatch();
  const isValidForm = useAppSelector(selectIsValidForm);
  const payload = useFormPayload();
  const navigate = useNavigate();

  const onSubmit = () => {
    if (!isValidForm) return;
    dispatch(addStartReadings(payload.readings));
    dispatch(setNeedSaving(true));
    navigate(pathNames.home);
  };

  return (
    <div className="add-initial-readings">
      <h1>Введите начальные показания счетчиков</h1>
      <MeterReadingsForm reducer={setMetersInputField} />
      <SubmitBlock isValidForm={isValidForm} onSubmit={onSubmit} />
    </div>
  );
};

export default AddInitialReadings;
