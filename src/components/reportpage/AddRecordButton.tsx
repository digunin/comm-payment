import React from "react";
import { useNavigate } from "react-router-dom";
import { setInitialValues } from "../../store/form/createMonthReportReducer";
import { selectActualPrice } from "../../store/price/priceReducer";
import { useLastRecord } from "../../hooks/form/useLastRecord";
import { createFormInitialValue } from "../../utils/form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hoks";
import { pathNames } from "../../utils/values";

const AddRecordButton = () => {
  const dispatch = useAppDispatch();
  const { latestRecord, newYear, newMonth } = useLastRecord();
  const price = useAppSelector(selectActualPrice);
  const navigate = useNavigate();
  const isEmptyReport = newYear === -1;

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
      className={`button add-button${
        isEmptyReport ? " the-only-one-button" : ""
      }`}
      onClick={onAddButtonClick}
      title="Добавить новую запись"
    >
      {isEmptyReport ? "Создайте первую запись" : "+"}
    </button>
  );
};

export default AddRecordButton;
