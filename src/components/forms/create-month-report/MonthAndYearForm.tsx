import React from "react";
import InputElement from "./InputElement";
import { useForm } from "../useForm";
import {
  InputField,
  setMonthAndYearInputFields,
} from "../../../store/form/createMonthReportReducer";
import { useLastRecord } from "../useLastRecord";
import DatePicker from "./DatePicker";

const MonthAndYearForm = () => {
  const { onChangeHandler } = useForm(
    "monthAndYear",
    setMonthAndYearInputFields
  );
  const { newYear, newMonth } = useLastRecord();
  return (
    <div className="form month-year-form">
      <DatePicker
        minYear={newYear}
        minMonth={newMonth}
        onchange={(y, m) => {
          onChangeHandler(y, "year");
          onChangeHandler(m, "month");
        }}
      />
    </div>
  );
};

export default MonthAndYearForm;
