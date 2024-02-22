import React from "react";
import YearsList from "./YearsList";
import MonthsList from "./MonthsList";
import Details from "./Details";

export function ReportPage() {
  return (
    <div className="global-report">
      <YearsList />
      <MonthsList />
      <Details />
    </div>
  );
}

export default ReportPage;
