import React from "react";
import { setInitialValues } from "../../store/form/createMonthReportReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { selectActualPrice } from "../../store/price/priceReducer";
import { useLastRecord } from "../forms/useLastRecord";
import { setMode } from "../../store/app-mode/appModeReducer";
import { createInitialValue } from "../../utils";

const AddRecordButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { latestRecord, newYear, newMonth } = useLastRecord();
  const price = useSelector(selectActualPrice);

  const initialValue = createInitialValue(
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
