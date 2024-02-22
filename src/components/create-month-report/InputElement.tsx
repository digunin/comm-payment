import React, { useState } from "react";

type IEProps = {
  labelText: string;
  value: string | number;
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputElement = ({ labelText, onchange, value }: IEProps) => {
  return (
    <div className="input-element">
      <label>
        <p>{labelText}</p>
        <input type="number" onChange={onchange} value={value} />
      </label>
    </div>
  );
};

export default InputElement;
