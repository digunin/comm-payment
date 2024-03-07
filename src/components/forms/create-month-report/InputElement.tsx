import React from "react";
import {
  InputFieldName,
  PhysicalMeterName,
} from "../../../store/form/createMonthReportReducer";
import WithErrorHandling from "../WithErrorHandlingInput";
import { CheckErrorOptions, InputChecker, Mutator } from "../errors";

export type IEProps = {
  meterName: PhysicalMeterName | InputFieldName;
  value: string | number;
  error: string | null;
  formName: string;
  onchange: (value: string, error: string | null) => void;
  checkers: Array<InputChecker>;
  checkOptions: CheckErrorOptions;
  mutators?: Array<Mutator>;
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
          onChange={(e) => onchange(e.target.value, null)}
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

export default WithErrorHandling(InputElement);
