import React from "react";
import InputElement from "./InputElement";
import {
  InputFieldName,
  InputFields,
  setPriceInputField,
} from "../../../store/form/createMonthReportReducer";
import { useForm } from "../useForm";

const PriceForm = () => {
  const { data, onChangeHandler } = useForm("price", setPriceInputField);

  return (
    <div className="form price-form">
      <h2>Цены</h2>
      {Object.keys(data).map((key) => {
        const meterName = key as InputFieldName;
        const { value, error } = (data as InputFields)[meterName];
        return (
          <InputElement
            meterName={meterName}
            formName="price"
            onchange={(value, error) =>
              onChangeHandler(value, meterName, error)
            }
            value={value}
            error={error}
            key={`price-form-input-${meterName}`}
          />
        );
      })}
    </div>
  );
};

export default PriceForm;
