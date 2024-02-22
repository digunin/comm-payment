import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectYearsDesc,
  setSelected,
  toggleCreateMode,
} from "../../store/payment/paymentReducer";
import YearButton from "./YearButton";
import { AppDispatch } from "../../store";
import { useSelected } from "./reportPageHooks/useSelected";

const YearsList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const years = useSelector(selectYearsDesc);
  const { selectedYear } = useSelected();

  const onYearButtonClick = (year: number) => {
    dispatch(setSelected({ selectedYear: year, selectedMonth: null }));
  };

  const onAddButtonClick = () => dispatch(toggleCreateMode());

  return (
    <div className="report-block years-list">
      <button className="year-button add-button" onClick={onAddButtonClick}>
        +
      </button>
      {years.map((year) => {
        return (
          <YearButton
            year={year}
            onclick={onYearButtonClick}
            selected={selectedYear === year ? true : false}
            key={`year-${year}`}
          />
        );
      })}
    </div>
  );
};

export default YearsList;
