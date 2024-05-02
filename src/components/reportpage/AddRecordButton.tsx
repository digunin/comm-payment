import React from "react";
import { setInitialValues } from "../../store/form/createMonthReportReducer";
import { selectActualPrice } from "../../store/price/priceReducer";
import { useLastRecord } from "../forms/useLastRecord";
import { setMode } from "../../store/app-mode/appModeReducer";
import { createFormInitialValue } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../AppHooks";

const AddRecordButton = () => {
  const dispatch = useAppDispatch();
  const { latestRecord, newYear, newMonth } = useLastRecord();
  const price = useAppSelector(selectActualPrice);

  const initialValue = createFormInitialValue(
    newMonth,
    newYear,
    price,
    latestRecord
  );

  const onAddButtonClick = () => {
    dispatch(setMode("create-month-report"));
    dispatch(setInitialValues(initialValue));
  };

  return (
    <button className="add-button" onClick={onAddButtonClick}>
      +
    </button>
  );
};

export default AddRecordButton;
