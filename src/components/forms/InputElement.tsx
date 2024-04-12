import React from "react";
import WithErrorHandling from "./errors/WithErrorHandlingInput";

export type IEProps = {
  wrapperClassName: string;
  inputClassName: string;
  errorClassName: string;
  title: string;
  value: string | number;
  error: string | null;
  onchange: (value: string, error: string | null) => void;
};

const InputElement = ({
  wrapperClassName,
  inputClassName,
  errorClassName,
  title,
  value,
  error,
  onchange,
}: IEProps) => {
  return (
    <div className={`input-wrapper ${wrapperClassName}-input-wrapper`}>
      <label>
        <p>{title}</p>
        <input
          className={`input-element ${inputClassName}${
            error ? " input-error" : ""
          }`}
          type="text"
          onChange={(e) => onchange(e.target.value, null)}
          value={value}
        />
      </label>

      {error && (
        <p className={`${errorClassName}-error-message error-message`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default WithErrorHandling(InputElement);
