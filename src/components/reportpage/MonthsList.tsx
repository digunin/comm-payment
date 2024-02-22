import React from "react";
import MonthButton from "./MonthButton";
import { useMonthsList } from "./reportPageHooks/useMonthsList";

const MonthsList = () => {
  const {
    fullYear,
    recordedMonths,
    onMonthButtonClick,
    onAddButtonClick,
    selectedMonth,
    selectedYear,
    isAddButtonNeed,
  } = useMonthsList();

  return (
    <div className="report-block months-list">
      {fullYear.map((month) => {
        return recordedMonths.includes(month) ? (
          <MonthButton
            month={month}
            onclick={onMonthButtonClick}
            selected={selectedMonth === month ? true : false}
            key={`month-${month}`}
          />
        ) : (
          <MonthButton month={month} disabled={true} key={`month-${month}`} />
        );
      })}
      {isAddButtonNeed && (
        <button className="month-button add-button" onClick={onAddButtonClick}>
          +
        </button>
      )}
    </div>
  );
};

export default MonthsList;
