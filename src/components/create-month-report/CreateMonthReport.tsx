import React from "react";
import { useDispatch } from "react-redux";
import InputElement from "./InputElement";
import { toggleCreateMode } from "../../store/form/createMonthReportReducer";
import { useCreateMonthReport } from "./useCreateMonthReport";

const CreateMonthReport = () => {
  const dispatch = useDispatch();

  const { errors, values, onChangeHandler, isValidForm } =
    useCreateMonthReport();

  const { hot, cold, electricity } = values;

  return (
    <div className="create-month-report">
      <div className="create-month-report input-block">
        <InputElement
          labelText="Cold"
          meterName="cold"
          onchange={(event) => onChangeHandler(event, "cold")}
          value={cold}
          error={errors.cold}
        />
        <InputElement
          labelText="Hot"
          meterName="hot"
          onchange={(event) => onChangeHandler(event, "hot")}
          value={hot}
          error={errors.hot}
        />
        <InputElement
          labelText="Electricity"
          meterName="electricity"
          onchange={(event) => onChangeHandler(event, "electricity")}
          value={electricity}
          error={errors.electricity}
        />
      </div>
      <div className="create-month-report submit-block">
        <button
          data-testid="btn-ok"
          disabled={!isValidForm}
          onClick={() => console.log(values)}
        >
          OK
        </button>
        <button onClick={() => dispatch(toggleCreateMode())}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateMonthReport;
