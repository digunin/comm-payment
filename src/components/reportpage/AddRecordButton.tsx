import React from "react";
import {
  setInitialValues,
  toggleCreateMode,
} from "../../store/form/createMonthReportReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { selectLatestRecord } from "../../store/payment/paymentReducer";
import { selectActualPrice } from "../../store/price/priceReducer";

const AddRecordButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const latestReadings = useSelector(selectLatestRecord);
  const price = useSelector(selectActualPrice);

  const { cold, hot, electricity } = latestReadings;

  const onAddButtonClick = () => {
    dispatch(toggleCreateMode());
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
            value: 0,
            error: null,
          },
          year: {
            value: 2025,
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
