import React from "react";
import InputElement from "./InputElement";
import { FormType, useForm } from "./useForm";
import { notInteger, lessThanPrevious } from "./errors/monthReportErrors";
import { PhysicalMeterName } from "../../store/form/types";
import { useMinReadings } from "./useMinReadings";

const MeterReadingsForm: FormType<PhysicalMeterName> = ({ reducer }) => {
  const {
    data: { metersInputFields },
    onChangeHandler,
  } = useForm(reducer);

  return (
    <div className="form meter-readings-form">
      <h2>Показания счетчиков</h2>
      {Object.keys(metersInputFields).map((key) => {
        const meterName = key as PhysicalMeterName;
        const { value, error } = metersInputFields[meterName];
        const formName = "meters";
        const wrapperClassName = formName;
        const inputClassName = `${formName}-input-element ${meterName}`;
        const errorClassName = `${formName}-${meterName}`;
        const minReadings = useMinReadings();
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
            checkOptions={{ min: minReadings[meterName].totalValue }}
            key={`meter-readings-form-input-${meterName}`}
          />
        );
      })}
    </div>
  );
};

export default MeterReadingsForm;
