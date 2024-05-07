import React from "react";
import { useSelected } from "../../hooks/report-page/useSelected";

const YearDetails = () => {
  const { selectedYear } = useSelected();
  return (
    <div className="details year-details">{`${selectedYear} details`}</div>
  );
};

export default YearDetails;
