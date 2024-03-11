import React from "react";
import InputElement from "./InputElement";
import { useForm } from "../useForm";
import {
  InputField,
  setMonthAndYearInputFields,
} from "../../../store/form/createMonthReportReducer";

const MonthAndYearForm = () => {
  const { data, onChangeHandler } = useForm(
    "monthAndYear",
    setMonthAndYearInputFields
  );
  const { month, year } = data as {
    month: InputField;
    year: InputField;
  };
  return (
    <div className="form month-year-form">
      <h2>Выбериет год и месяц</h2>
      <p>{year.value}</p>
      <p>{month.value}</p>
    </div>
  );
};

export default MonthAndYearForm;
