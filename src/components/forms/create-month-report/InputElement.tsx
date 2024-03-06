import React from "react";
import {
  InputFieldName,
  PhysicalMeterName,
} from "../../../store/form/createMonthReportReducer";

type IEProps = {
  meterName: PhysicalMeterName | InputFieldName;
  value: string | number;
  error: string | null;
  formName: string;
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputElement = ({
  formName,
  meterName,
  value,
  error,
  onchange,
}: IEProps) => {
  return (
    <div className={`input-wrapper ${formName}-input-wrapper`}>
      <label>
        <p>{meterName}</p>
        <input
          className={`input-element ${formName}-input-element${
            error ? " input-error" : ""
          } ${meterName}`}
          type="text"
          onChange={onchange}
          value={value}
        />
      </label>

      {error && (
        <p className={`${formName}-${meterName}-error-message error-message`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputElement;
