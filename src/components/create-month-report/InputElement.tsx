import React from "react";
import { PhysicalMeters } from "../../store/form/createMonthReportReducer";

type IEProps = {
  labelText: string;
  meterName: PhysicalMeters;
  value: string | number;
  error: string | null;
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputElement = ({
  labelText,
  meterName,
  value,
  error,
  onchange,
}: IEProps) => {
  return (
    <div className={`input-element${error ? " input-error" : ""} ${meterName}`}>
      <label htmlFor={meterName}>
        <p>{labelText}</p>
      </label>
      <input type="text" name={meterName} onChange={onchange} value={value} />
    </div>
  );
};

export default InputElement;
