import React from "react";
import { useDispatch } from "react-redux";
import InputElement from "./InputElement";
import {
  PhysicalMeters,
  toggleCreateMode,
} from "../../store/form/createMonthReportReducer";
import { useCreateMonthReport } from "./useCreateMonthReport";

const CreateMonthReport = () => {
  const dispatch = useDispatch();
  const { data, onChangeHandler, isValidForm } = useCreateMonthReport();

  return (
    <div className="create-month-report">
      <div className="create-month-report input-block">
        {Object.keys(data).map((key) => {
          const meterName = key as PhysicalMeters;
          const { value, error } = data[meterName];
          return (
            <InputElement
              labelText={meterName}
              meterName={meterName}
              onchange={(event) => onChangeHandler(event, meterName)}
              value={value}
              error={error}
              key={`create-month-report-input-${meterName}`}
            />
          );
        })}
      </div>
      <div className="create-month-report submit-block">
        <button
          data-testid="btn-ok"
          disabled={!isValidForm}
          onClick={() => console.log(data)}
        >
          OK
        </button>
        <button onClick={() => dispatch(toggleCreateMode())}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateMonthReport;
