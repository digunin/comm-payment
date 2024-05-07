import React from "react";
import YearButton from "./YearButton";
import AddRecordButton from "./AddRecordButton";
import { useYearsList } from "../../hooks/report-page/useYearsList";

const YearsList = () => {
  const { years, selectedYear, onYearButtonClick } = useYearsList();

  return (
    <div className="report-block years-list">
      <AddRecordButton />
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
