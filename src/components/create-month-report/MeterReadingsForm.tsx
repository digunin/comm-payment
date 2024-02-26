import React from "react";
import InputElement from "./InputElement";
import { PhysicalMeters } from "../../store/form/createMonthReportReducer";
import { useMtersForm } from "./useMetersForm";

const MeterReadingsForm = () => {
  const { data, onChangeHandler } = useMtersForm();

  return (
    <div className="meter-readings-form">
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
            key={`meter-readings-form-input-${meterName}`}
          />
        );
      })}
    </div>
  );
};

export default MeterReadingsForm;
