import React from "react";
import InputElement from "./InputElement";
import {
  PhysicalMeterName,
  setMetersInputField,
} from "../../../store/form/createMonthReportReducer";
import { useForm } from "../useForm";

const MeterReadingsForm = () => {
  const { data, onChangeHandler } = useForm("meters", setMetersInputField);

  return (
    <div className="form meter-readings-form">
      <h2>Показания счетчиков</h2>
      {Object.keys(data).map((key) => {
        const meterName = key as PhysicalMeterName;
        const { value, error } = data[meterName];
        return (
          <InputElement
            meterName={meterName}
            formName="meters"
            onchange={(value, error) =>
              onChangeHandler(value, meterName, error)
            }
            value={value}
            error={error}
            key={`meter-readings-form-input-${meterName}`}
          />
        );
      })}
    </div>
  );
};

export default MeterReadingsForm;
