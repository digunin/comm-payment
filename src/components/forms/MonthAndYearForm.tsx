import React from "react";
import { FormType, useForm } from "./useForm";
import { useLastRecord } from "./useLastRecord";
import DatePicker from "./DatePicker";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const MonthAndYearForm: FormType = ({ reducer }) => {
  const { onChangeHandler } = useForm("monthAndYear", reducer);
  const { newYear, newMonth } = useLastRecord();
  const { year, month } = useSelector(
    (state: RootState) => state.createMonthReportState.monthAndYearInputFields
  );
  return (
    <div className="form month-year-form">
      <DatePicker
        minYear={newYear}
        minMonth={newMonth}
        value={`${year.value}-${("0" + (Number(month.value) + 1)).slice(
          -2
        )}-01`}
        onchange={(y, m) => {
          onChangeHandler(y, "year");
          onChangeHandler(m, "month");
        }}
      />
    </div>
  );
};

export default MonthAndYearForm;
