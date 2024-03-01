import React from "react";
import InputElement from "./InputElement";
import { PhysicalMeterName } from "../../store/form/createMonthReportReducer";
import { useMetersForm } from "./useMetersForm";

const MeterReadingsForm = () => {
  const { data, onChangeHandler } = useMetersForm();

  return (
    <div className="form meter-readings-form">
      <h2>Показания счетчиков</h2>
      {Object.keys(data).map((key) => {
        const meterName = key as PhysicalMeterName;
        const { value, error } = data[meterName];
        return (
          <InputElement
            labelText={meterName}
            meterName={meterName}
            formName="meters"
            onchange={(event) => onChangeHandler(event, meterName)}
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
