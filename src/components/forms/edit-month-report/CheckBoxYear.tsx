import React, { useEffect, useState } from "react";
import { Months } from "../../../store/payment/paymentReducer.utils";
import { useSelected } from "../../reportpage/reportPageHooks/useSelected";

const CheckBoxYear = ({
  yearList,
  year,
  onclick,
}: {
  yearList: { [key in Months]?: boolean };
  year: number;
  onclick: (year: number, month: Months) => void;
}) => {
  const { selectedMonth, selectedYear } = useSelected();

  const checkedList = Object.values(yearList).filter(
    (checked) => checked === true
  );
  const [showFull, setShowFull] = useState(false);
  useEffect(() => setShowFull(checkedList.length > 0), [checkedList.length]);

  return (
    <div className="checkbox-year">
      <h4 className="header" onClick={() => setShowFull(true)}>
        {year}
        {!showFull && <span role="button">▼</span>}
      </h4>
      {showFull && (
        <div className="checkbox-year-list">
          {Object.keys(yearList)
            .map((month) => Number(month))
            .map((month) => {
              const disabled = year === selectedYear && month === selectedMonth;
              return (
                <label key={`${year}-${month}-checkbox`}>
                  <input
                    type="checkbox"
                    checked={yearList[month as Months]}
                    onChange={(_) => onclick(year, month)}
                    disabled={disabled}
                  />
                  <span>{month + 1}</span>
                </label>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default CheckBoxYear;
