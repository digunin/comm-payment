import React from "react";
import {
  setAllFields,
  toggleCreateMode,
} from "../../store/form/createMonthReportReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { selectLatestRecord } from "../../store/payment/paymentReducer";

const AddRecordButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { latestReadings } = useSelector(selectLatestRecord);

  const { cold, hot, electricity } = latestReadings;

  const onAddButtonClick = () => {
    dispatch(toggleCreateMode());
    dispatch(
      setAllFields({
        cold: { value: cold.totalValue, error: null },
        hot: { value: hot.totalValue, error: null },
        electricity: { value: electricity.totalValue, error: null },
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
