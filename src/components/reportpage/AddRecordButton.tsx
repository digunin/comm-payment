import React from "react";
import { setInitialValues } from "../../store/form/createMonthReportReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { selectActualPrice } from "../../store/price/priceReducer";
import { useLastRecord } from "../forms/useLastRecord";
import { setMode } from "../../store/app-mode/appModeReducer";

const AddRecordButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { latestRecord, newYear, newMonth } = useLastRecord();
  const price = useSelector(selectActualPrice);

  const { cold, hot, electricity } = latestRecord;

  const onAddButtonClick = () => {
    dispatch(setMode("create-month-report"));
    dispatch(
      setInitialValues({
        metersInputFields: {
          cold: { value: cold.totalValue, error: null },
          hot: { value: hot.totalValue, error: null },
          electricity: { value: electricity.totalValue, error: null },
        },
        priceInputFields: {
          cold: { value: price.cold, error: null },
          hot: { value: price.hot, error: null },
          electricity: { value: price.electricity, error: null },
          waterWaste: { value: price.waterWaste, error: null },
        },
        monthAndYearInputFields: {
          month: {
            value: newMonth,
            error: null,
          },
          year: {
            value: newYear,
            error: null,
          },
        },
      })
    );
  };

  return (
    <button className="add-button" onClick={onAddButtonClick}>
      +
    </button>
  );
};

export default AddRecordButton;
