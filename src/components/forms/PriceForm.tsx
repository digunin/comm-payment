import React from "react";
import InputElement from "./InputElement";
import { FormType, useForm } from "./useForm";
import { priceMutator } from "./errors/monthReportErrors";
import { notNumber, max2digitsAfterDot } from "./errors/monthReportErrors";
import { InputFields, PriceFieldName } from "../../store/form/types";

const PriceForm: FormType = ({ reducer }) => {
  const { data, onChangeHandler } = useForm("price", reducer);

  return (
    <div className="form price-form">
      <h2>Цены</h2>
      {Object.keys(data).map((key) => {
        const meterName = key as PriceFieldName;
        const { value, error } = (data as InputFields)[meterName];
        const formName = "price";
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
            mutators={[priceMutator]}
            checkers={[notNumber, max2digitsAfterDot]}
            checkOptions={{ maxAfterDot: 2 }}
            key={`price-form-input-${meterName}`}
          />
        );
      })}
    </div>
  );
};

export default PriceForm;
