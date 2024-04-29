import { useSelector } from "react-redux";
import { selectListOfReports } from "../../store/payment/paymentReducer";
import { Months } from "../../store/payment/paymentReducer.utils";
import { useState } from "react";

export type CHeckBoxList = { [key: number]: { [key in Months]?: boolean } };

export const useMultipleFix = () => {
  const list: CHeckBoxList = JSON.parse(useSelector(selectListOfReports));
  const [checkboxList, setCheckboxList] = useState(list);

  const onCheckBox = (year: number, month: Months) => {
    setCheckboxList((prev) => {
      const changedYear = prev[year];
      const changedMonth = changedYear[month];
      return {
        ...prev,
        [year]: { ...changedYear, [month]: !changedMonth },
      };
    });
  };

  const listOfChecked: { [key: number]: Array<Months> } = Object.keys(
    checkboxList
  )
    .map((year) => Number(year))
    .reduce((years, year) => {
      const monthsList = Object.keys(checkboxList[year])
        .map((month) => Number(month))
        .filter((month) => checkboxList[year][month as Months] === true);
      return monthsList.length > 0
        ? {
            ...years,
            [year]: monthsList,
          }
        : years;
    }, {});

  const isMultiChoice =
    Object.values(listOfChecked).reduce((sum, arr) => sum + arr.length, 0) > 1;

  return { checkboxList, onCheckBox, isMultiChoice, listOfChecked };
};
