import React from "react";
import { useSelected } from "../../hooks/report-page/useSelected";
import MonthDetails from "./month-report/MonthDetails";
import YearDetails from "./YearDetails";

const Details = () => {
  const { selectedMonth, selectedYear } = useSelected();
  const needMonthDetails: boolean = selectedMonth !== null;
  const needYearDetails: boolean =
    selectedYear !== null && selectedMonth === null;
  return (
    <div className="report-block">
      {needMonthDetails && <MonthDetails />}
      {needYearDetails && <YearDetails />}
    </div>
  );
};

export default Details;
