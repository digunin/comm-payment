import React from "react";
import { setInitialValues } from "../../store/form/createMonthReportReducer";
import { selectActualPrice } from "../../store/price/priceReducer";
import { useLastRecord } from "../forms/useLastRecord";
import { createFormInitialValue } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../AppHooks";
import { useNavigate } from "react-router-dom";
import { pathNames } from "../../route-paths";

const AddRecordButton = () => {
  const dispatch = useAppDispatch();
  const { latestRecord, newYear, newMonth } = useLastRecord();
  const price = useAppSelector(selectActualPrice);
  const navigate = useNavigate();

  const initialValue = createFormInitialValue(
    newMonth,
    newYear,
    price,
    latestRecord
  );

  const onAddButtonClick = () => {
    dispatch(setInitialValues(initialValue));
    navigate(pathNames.create);
  };

  return (
    <button
      className="add-button"
      onClick={onAddButtonClick}
      title="Добавить новую запись"
    >
      +
    </button>
  );
};

export default AddRecordButton;
