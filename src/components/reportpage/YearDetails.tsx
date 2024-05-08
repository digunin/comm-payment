import React from "react";
import { useSelected } from "../../hooks/report-page/useSelected";

const YearDetails = () => {
  const { selectedYear } = useSelected();
  return <div className="details year-details">Выберите месяц</div>;
};

export default YearDetails;
