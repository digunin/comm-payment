import React from "react";
import InputElement from "./InputElement";
import { useForm } from "../useForm";
import {
  InputField,
  setMonthAndYearInputFields,
} from "../../../store/form/createMonthReportReducer";
import { useLastRecord } from "../useLastRecord";
import { checkDiapason, checkIsInteger } from "../errors";
import { Months } from "../../../store/payment/paymentReducer.utils";

const MonthAndYearForm = () => {
  const { data, onChangeHandler } = useForm(
    "monthAndYear",
    setMonthAndYearInputFields
  );
  const { newYear, newMonth } = useLastRecord();
  const { month, year } = data as {
    month: InputField;
    year: InputField;
  };
  return (
    <div className="form month-year-form">
      <h2>Выбериет год и месяц</h2>
      <InputElement
        wrapperClassName="month-year"
        inputClassName="month-year-input-element year"
        errorClassName="month-year year"
        title="Год"
        value={year.value}
        error={year.error}
        checkers={[
          { check: checkIsInteger, text: "Год должен быть целым числом" },
          { check: checkDiapason, text: `Минимальный год ${newYear}` },
        ]}
        checkOptions={{ min: newYear }}
        onchange={(value, error) => onChangeHandler(value, "year", error)}
      />
      <InputElement
        wrapperClassName="month-year"
        inputClassName="month-year-input-element month"
        errorClassName="month-year month"
        title="Месяц"
        value={month.value}
        error={month.error}
        checkers={[
          { check: checkIsInteger, text: "Месяц должен быть целым числом" },
          {
            check: checkDiapason,
            text: `Введите месяц от ${newMonth} до ${Months.dec}`,
          },
        ]}
        checkOptions={{ min: newMonth, max: Months.dec }}
        onchange={(value, error) => onChangeHandler(value, "month", error)}
      />
    </div>
  );
};

export default MonthAndYearForm;
