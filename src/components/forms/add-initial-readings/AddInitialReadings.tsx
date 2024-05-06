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
import { setMode, setNeedSaving } from "../../../store/app-mode/appModeReducer";

const AddInitialReadings = () => {
  const dispatch = useAppDispatch();
  const isValidForm = useAppSelector(selectIsValidForm);
  const payload = useFormPayload();

  const onSubmit = () => {
    if (!isValidForm) return;
    dispatch(addStartReadings(payload.readings));
    dispatch(setMode("show-report"));
    dispatch(setNeedSaving(true));
  };

  return (
    <div className="add-initial-readings">
      <h1>Введите начальные показания счетчиков</h1>
      <MeterReadingsForm reducer={setMetersInputField} />
      <SubmitBlock
        isValidForm={isValidForm}
        onSubmit={onSubmit}
        onCancel={() => dispatch(setMode("show-report"))}
      />
    </div>
  );
};

export default AddInitialReadings;
