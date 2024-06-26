import React from "react";
import InputElement from "./InputElement";
import { FormType, useForm } from "../../hooks/form/useForm";
import { priceMutator } from "./errors/monthReportErrors";
import { notNumber, max2digitsAfterDot } from "./errors/monthReportErrors";
import { PriceFieldName } from "../../store/form/types";
import { actualNames } from "../../utils/lang";

const PriceForm: FormType<PriceFieldName> = ({ reducer }) => {
  const {
    data: { priceInputFields },
    onChangeHandler,
  } = useForm(reducer);

  return (
    <div className="form price-form">
      <h2>Цены</h2>
      {Object.keys(priceInputFields).map((key) => {
        const meterName = key as PriceFieldName;
        const { value, error } = priceInputFields[meterName];
        const formName = "price";
        const wrapperClassName = formName;
        const inputClassName = `${formName}-input-element ${meterName}`;
        const errorClassName = `${formName}-${meterName}`;
        return (
          <InputElement
            wrapperClassName={wrapperClassName}
            inputClassName={inputClassName}
            errorClassName={errorClassName}
            title={actualNames.meterNames[meterName]}
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
