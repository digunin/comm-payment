import React from "react";
import { useDispatch } from "react-redux";
import { toggleCreateMode } from "../../store/payment/paymentReducer";
import InputElement from "./InputElement";
import { useCreateMonthReport } from "./useCreateMonthReport";

const CreateMonthReport = () => {
  const dispatch = useDispatch();

  const { values, onChangeHandler } = useCreateMonthReport();

  const { hot, cold, electricity } = values;

  return (
    <div className="create-month-report">
      <div className="create-month-report input-block">
        <InputElement
          labelText="Hot"
          onchange={(event) => onChangeHandler(event, "hot")}
          value={hot}
        />
        <InputElement
          labelText="Cold"
          onchange={(event) => onChangeHandler(event, "cold")}
          value={cold}
        />
        <InputElement
          labelText="Electricity"
          onchange={(event) => onChangeHandler(event, "electricity")}
          value={electricity}
        />
      </div>
      <div className="create-month-report submit-block">
        <button onClick={() => console.log(values)}>OK</button>
        <button onClick={() => dispatch(toggleCreateMode())}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateMonthReport;
