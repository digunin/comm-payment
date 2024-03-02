import React from "react";
import {
  InputFieldName,
  PhysicalMeterName,
} from "../../store/form/createMonthReportReducer";

type IEProps = {
  labelText: string;
  meterName: PhysicalMeterName | InputFieldName;
  value: string | number;
  error: string | null;
  formName: string;
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputElement = ({
  labelText,
  meterName,
  value,
  error,
  formName,
  onchange,
}: IEProps) => {
  return (
    <div
      className={`input-element ${formName}-input-element${
        error ? " input-error" : ""
      } ${meterName}`}
    >
      <label htmlFor={meterName}>
        <p>{labelText}</p>
      </label>
      <input type="text" name={meterName} onChange={onchange} value={value} />
      {error && (
        <p className={`${formName}-${meterName}-error-message error-message`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputElement;
