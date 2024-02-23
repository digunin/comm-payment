import React, { useState } from "react";
import { MeterReadings } from "../../store/payment/paymentReducer.utils";

type IEProps = {
  labelText: string;
  meterName: Exclude<keyof MeterReadings, "waterWaste">;
  value: string | number;
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputElement = ({ labelText, onchange, meterName, value }: IEProps) => {
  return (
    <div className={`input-element ${meterName}`}>
      <label htmlFor={meterName}>
        <p>{labelText}</p>
      </label>
      <input type="number" name={meterName} onChange={onchange} value={value} />
    </div>
  );
};

export default InputElement;
