import React from "react";
import { FormType, useForm } from "../../hooks/form/useForm";
import { useLastRecord } from "../../hooks/form/useLastRecord";
import DatePicker from "./DatePicker";
import { MonthAndYearFieldName } from "../../store/form/types";

const MonthAndYearForm: FormType<MonthAndYearFieldName> = ({ reducer }) => {
  const { data, onChangeHandler } = useForm(reducer);
  const { newYear, newMonth } = useLastRecord();
  const { year, month } = data.monthAndYearInputFields;
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
