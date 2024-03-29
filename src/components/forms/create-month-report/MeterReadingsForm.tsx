import React from "react";
import InputElement from "./InputElement";
import {
  InputFields,
  PhysicalMeterName,
  setMetersInputField,
} from "../../../store/form/createMonthReportReducer";
import { useForm } from "../useForm";
import { notInteger, lessThanPrevious } from "./createMonthReportErrors";
import { useLastRecord } from "../useLastRecord";

const MeterReadingsForm = () => {
  const { data, onChangeHandler } = useForm("meters", setMetersInputField);
  const { latestRecord } = useLastRecord();

  return (
    <div className="form meter-readings-form">
      <h2>Показания счетчиков</h2>
      {Object.keys(data).map((key) => {
        const meterName = key as PhysicalMeterName;
        const { value, error } = (data as InputFields)[meterName];
        const formName = "meters";
        const wrapperClassName = formName;
        const inputClassName = `${formName}-input-element ${meterName}`;
        const errorClassName = `${formName}-${meterName}`;
        return (
          <InputElement
            wrapperClassName={wrapperClassName}
            inputClassName={inputClassName}
            errorClassName={errorClassName}
            title={meterName}
            onchange={(value, error) =>
              onChangeHandler(value, meterName, error)
            }
            value={value}
            error={error}
            checkers={[notInteger, lessThanPrevious]}
            checkOptions={{ min: latestRecord[meterName].totalValue }}
            key={`meter-readings-form-input-${meterName}`}
          />
        );
      })}
    </div>
  );
};

export default MeterReadingsForm;
